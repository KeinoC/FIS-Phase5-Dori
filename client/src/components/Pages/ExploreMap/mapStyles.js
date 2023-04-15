
const mapLandscape = "#f5f5f5"
const mapHighway = "#f0c61f"
const mapPoi = "#036b61"
const secondaryMap = ""
const roadsMap = ""
const markersMap = ""
const waterMap = "#02414d"
const dark = "#3b3934"


export default [
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [
            {
                color: waterMap,
            },
        ],
    },
    {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [
            {
                color: dark,
            },
        ],
    },
    {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
            {
                color: mapPoi,
            },
        ],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
            {
                color: mapHighway,
            },
        ],
    },
    {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
            {
                color: "#3b3934",
            },
            {
                lightness: -20,
            },
        ],
    },
    {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [
            {
                color: "#3b3934",
            },
            {
                lightness: -17,
            },
        ],
    },
    {
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#ffffff",
            },
            {
                visibility: "on",
            },
            {
                weight: 0.9,
            },
        ],
    },
    {
        elementType: "labels.text.fill",
        stylers: [
            {
                visibility: "on",
            },
            {
                color: "#ffffff",
            },
        ],
    },
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
            {
                visibility: "simplified",
            },
        ],
    },
    {
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "transit",
        elementType: "geometry",
        stylers: [
            {
                color: "#3b3934",
            },
            {
                lightness: -10,
            },
        ],
    },
    {},
    {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [
            {
                color: "#3b3934",
            },
            {
                weight: 0.7,
            },
        ],
    },
];
