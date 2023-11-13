console.info('Let the magic begin! 🪄');

let directionsService;
let directionsDisplay;

function getLocation(){
    navigator.geolocation.getCurrentPosition((position) => {
        let pos = new google.maps.LatLng(
            position.coords.latitude, 
            position.coords.longitude
        );

        initMap(pos);
    });
}

const initMap = async (location) => {
    const { Map } = await google.maps.importLibrary("maps");

    // Directions
    mapDirections = new google.maps.Map(document.querySelector('#map-directions'), {
        center: location,
        zoom: 15
    });

    //Suppress A & B markers - begin
    // var rendererOptions = {
    //     map: mapDirections,
    //     draggable: true,
    //     suppressMarkers: true,
    // }

    // directionsDisplay = new google.maps.DirectionsRendererOptions(rendererOptions);
    //end

    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(mapDirections);

    let village = {lat: 45.52126, lng: -73.55747};
    let destination = new google.maps.LatLng(village);

    calcRoute(location, destination);
}

function calcRoute(start, destination){
    let request = {
        origin: start,
        destination: destination,
        travelMode: google.maps.TravelMode.TRANSIT,
    };
  
    directionsService.route(request, function(response, status){
        if(status == 'OK'){
            directionsDisplay.setDirections(response);

            let starter = new google.maps.Marker({
                position: start,
                map: mapDirections,
                label: {
                    text: '👁️',
                    fontSize: "5em",
                }
            });

            let marker = new google.maps.Marker({
                position: destination,
                map: mapDirections,
                label: {
                    text: '🙋🏽‍♂',
                    fontSize: "5em",
                }
            });
        }
    })
}