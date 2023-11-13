console.info('Where are you? 👀');

const infoLocation = document.querySelector("#map-loc-info");

function getLocation(){
    navigator.geolocation.getCurrentPosition((position) => {
        let pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        initMap(pos);
    });
}

let map;
const initMap = async (location) => {
    const { Map } = await google.maps.importLibrary("maps");

    map = new google.maps.Map(document.querySelector("#map-location"), {
        center: location,
        zoom: 15
    });

    let marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'I see you!',
        label: {
            text: '👁️',
            fontSize: "5em",
        }
    });
}

