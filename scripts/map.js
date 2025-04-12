export function init() {
    const loadDgis = () => {
      if (window.DG) return Promise.resolve();
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://maps.api.2gis.ru/2.0/loader.js?pkg=full';
        script.onload = resolve;
        document.body.appendChild(script);
      });
    };
  
    loadDgis().then(() => {
      DG.then(() => {
        const map = DG.map('map', {
          center: [52.207629, 104.108685],
          zoom: 14
        });
        DG.tileLayer('https://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}&v=1').addTo(map);
  
        const markerElement = document.getElementById('custom-marker');
  
        function updateMarkerPosition() {
          const pos = map.latLngToContainerPoint([52.2064, 104.0898]);
          markerElement.style.left = `${pos.x}px`;
          markerElement.style.top = `${pos.y}px`;
        }
  
        function updateMapView() {
          const windowWidth = window.innerWidth;
          let center, zoom = 14;
  
          if (windowWidth < 480) {
            center = [52.194574, 104.091646];
          } else if (windowWidth < 740) {
            center = [52.199852, 104.090776];
          } else if (windowWidth < 1050) {
            center = [52.201335, 104.090573];
          } else {
            center = [52.207629, 104.108685];
          }
  
          map.setView(center, zoom);
        }
  
        window.addEventListener('resize', updateMapView);
        map.on('move', updateMarkerPosition);
        
        updateMapView();
        updateMarkerPosition();
      });
    });
  
    console.log('Map module initialized');
  }