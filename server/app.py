#!/usr/bin/env python3
from datetime import datetime
from flask import request, session, jsonify
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import joinedload

from config import app, db, api
from models import User, Unit, Lessee, Lessor, Lease, UnitApplication

date_str = '1995-05-23'

class Signup(Resource):
    
    def post(self):

        request_json = request.get_json()

        username = request_json.get('username')
        first_name = request_json.get("first_name")
        last_name = request_json.get("last_name")
        email = request_json.get("email")
        phone = request_json.get("phone")
        password = request_json.get('password')
        dob = request_json.get("dob")
        lot = request_json.get("lot")
        street = request_json.get("street")
        city = request_json.get("city")
        state = request_json.get("state")
        zip = request_json.get("zip")
        photo_id = request_json.get("photo_id")
        image_url = request_json.get('image_url')
        bio = request_json.get('bio')
        created_at = datetime.now()
        updated_at = datetime.now()


        user = User(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email,
            phone=phone,
            dob=datetime.strptime(dob, '%Y-%m-%d'),
            lot=lot,
            street=street,
            city=city,
            state=state,
            zip=zip,
            photo_id=photo_id,
            image_url=image_url,
            bio=bio,
            created_at=created_at,
            updated_at=updated_at
)
        

        # the setter will encrypt this
        user.password_hash = password

        print('first')

        try:

            print('here!')

            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id

            print(user.to_dict())

            return user.to_dict(), 201

        except IntegrityError as ie:
            print(ie.orig)
            print(ie.statement)
            return {'error': '422 Unprocessable Entity'}, 422

class CheckSession(Resource):
    
    def get(self):

        if session.get('user_id'):

            user = User.query.filter(User.id == session['user_id']).first()

            return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401
############ users endpoints ############

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users])

@app.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    return jsonify(user.serialize())

@app.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    data = request.get_json()
    user = User.query.get(id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    for key, value in data.items():
        setattr(user, key, value)
    db.session.commit()
    return jsonify(user.to_dict()) #watch
    

class Login(Resource):
    
    def post(self):

        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('password')

        user = User.query.filter(User.username == username).first()

        if user:
            if user.authenticate(password):

                session['user_id'] = user.id
                return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401

class Logout(Resource):
    
    def delete(self):
        
        if session.get('user_id'):
            
            session['user_id'] = None
            
            return {}, 204
        
        return {'error': '401 Unauthorized'}, 401

##################### units #####################

# Create a new unit
@app.route('/units', methods=['POST'])
def create_unit():
    try:
        data = request.get_json()

        unit = Unit(**data)

        db.session.add(unit)
        db.session.commit()

        return jsonify(unit.serialize()), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Unit must have price! Try again"}), 500

# Get all units
@app.route('/units', methods=['GET'])
def get_units():
    units = Unit.query.all()
    return jsonify([unit.to_dict(rules=(("lessees",))) for unit in units]), 200


# Get a specific unit
@app.route('/units/<int:id>', methods=['GET'])
def get_unit(id):
    unit = Unit.query.get(id)
    if unit is None:
        return jsonify({'error': 'Unit not found'}), 404
    return jsonify(unit.to_dict(rules=(("lessees",)))), 200

# Update a unit
@app.route('/units/<int:id>', methods=['PUT'])
def update_unit(id):
    data = request.get_json()
    unit = Unit.query.get(id)
    if unit is None:
        return jsonify({'error': 'Unit not found'}), 404
    for key, value in data.items():
        setattr(unit, key, value)
    db.session.commit()
    return jsonify(unit.serialize()), 200

# Delete a unit
@app.route('/units/<int:id>', methods=['DELETE'])
def delete_unit(id):
    unit = Unit.query.get(id)
    if unit is None:
        return jsonify({'error': 'Unit not found'}), 404
    db.session.delete(unit)
    db.session.commit()
    return jsonify({'message': 'Unit deleted successfully'}), 200

##################### UnitApplication #####################



@app.route('/unit_applications', methods=['POST'])
def create_unit_application():
    data = request.json
    unit_application = UnitApplication(**data)
    db.session.add(unit_application)
    db.session.commit()
    return jsonify(unit_application.serialize()), 201

@app.route('/unit_applications', methods=['GET'])
def get_all_unit_applications():
    unit_applications = UnitApplication.query.all()
    return jsonify([unit_application.serialize() for unit_application in unit_applications]), 200

@app.route('/unit_applications/<int:id>', methods=['GET'])
def get_unit_application(id):
    unit_application = UnitApplication.query.get(id)
    if not unit_application:
        return jsonify({'error': 'UnitApplication not found'}), 404
    return jsonify(unit_application.serialize()), 200

@app.route('/unit_applications/<int:id>', methods=['PUT'])
def update_unit_application(id):
    data = request.json
    unit_application = UnitApplication.query.get(id)
    if not unit_application:
        return jsonify({'error': 'UnitApplication not found'}), 404
    for key, value in data.items():
        setattr(unit_application, key, value)
    db.session.commit()
    return jsonify(unit_application.serialize()), 200

@app.route('/unit_applications/<int:id>', methods=['DELETE'])
def delete_unit_application(id):
    unit_application = UnitApplication.query.get(id)
    if not unit_application:
        return jsonify({'error': 'UnitApplication not found'}), 404
    db.session.delete(unit_application)
    db.session.commit()
    return jsonify({'message': 'UnitApplication deleted successfully'}), 200


##################### Lease ######################

# Create a new lease
@app.route('/leases', methods=['POST'])
def create_lease():
    data = request.json
    signed_date_str = data['signed_date']  
    start_date_str = data['start_date']  
    end_date_str = data['end_date']  
    
    signed_date = datetime.strptime(signed_date_str, '%Y-%m-%d')  
    start_date = datetime.strptime(start_date_str, '%Y-%m-%d')  
    end_date = datetime.strptime(end_date_str, '%Y-%m-%d')  
    
    lease = Lease(lessor_id=data['lessor_id'],
        lessee_id=data['lessee_id'],
        unit_id=data['unit_id'],
        signed_date=signed_date,  
        start_date=start_date,  
        end_date=end_date,  
        rent=data['rent'],
        sec_deposit=data['sec_deposit'],
        beds=data['beds'],
        baths=data['baths'],
        sqft=data['sqft'],
        type=data['type'],
        util_incld=data['util_incld'],
        util_excld=data['util_excld'],
        lot=data['lot'],
        street=data['street'],
        unit_num=data['unit_num'],
        city=data['city'],
        state=data['state'],
        zip=data['zip'])
    db.session.add(lease)
    db.session.commit()
    return jsonify(lease.to_dict()), 201

# Get all leases
@app.route('/leases', methods=['GET'])
def get_all_leases():
    leases = Lease.query.all()
    return jsonify([lease.serialize() for lease in leases]), 200

# Get a specific lease by ID
@app.route('/leases/<int:id>', methods=['GET'])
def get_lease(id):
    lease = Lease.query.get(id)
    if not lease:
        return jsonify({'error': 'Lease not found'}), 404
    return jsonify(lease.serialize()), 200

# Update an existing lease
@app.route('/leases/<int:id>', methods=['PUT'])
def update_lease(id):
    lease = Lease.query.get(id)
    if not lease:
        return jsonify({'error': 'Lease not found'}), 404
    data = request.json
    for key, value in data.items():
        setattr(lease, key, value)
    db.session.commit()
    return jsonify(lease.serialize()), 200

# Delete a lease by ID
@app.route('/leases/<int:id>', methods=['DELETE'])
def delete_lease(id):
    lease = Lease.query.get(id)
    if not lease:
        return jsonify({'error': 'Lease not found'}), 404
    db.session.delete(lease)
    db.session.commit()
    return jsonify({'message': 'Lease deleted'}), 200


api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')

if __name__ == '__main__':
    app.run(port=5555, debug=True)


