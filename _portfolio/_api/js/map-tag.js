console.info("Who's there? 🧐");

let map;

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    let village = {lat: 45.52126, lng: -73.55747};

    map = new Map(document.querySelector("#map-tag"), {
        center: village,
        zoom: 15,
    });

    let marker = new google.maps.Marker({
        position: village,
        map: map,
        title: 'Hi there!',
        label: {
            text: '🙋🏽‍♂',
            fontSize: "5em",
        }
    });
}