DG.then(function () {
    var map = DG.map('map', {
        center: [52.207629, 104.108685],
        zoom: 14
    });
    DG.tileLayer('https://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}&v=1').addTo(map);

    var markerElement = document.getElementById('custom-marker');

    function updateMarkerPosition() {
        var pos = map.latLngToContainerPoint([52.2064, 104.0898]);
        markerElement.style.left = pos.x + 'px';
        markerElement.style.top = pos.y + 'px';
    }
    function updateMapView() {
        var windowWidth = window.innerWidth;

        if (windowWidth < 480) {
            map.setView([52.194574, 104.091646], 14);
        } else if (windowWidth < 740) {
            map.setView([52.199852, 104.090776], 14);
        } else if (windowWidth < 1050) {
            map.setView([52.201335, 104.090573], 14);
        } else {
            map.setView([52.207629, 104.108685], 14);
        }
    }

    // Слушаем изменение окна
    window.addEventListener('resize', updateMapView);
    updateMapView();

    map.on('move', updateMarkerPosition);
    updateMarkerPosition();
  });