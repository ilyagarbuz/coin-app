import ymaps from 'ymaps';

export default function initMap(points) {
  ymaps
    .load()
    .then((maps) => {
      const map = new maps.Map('map', {
        center: [56.21624240946671, 43.20413270831272],
        zoom: 4,
      });

      points.forEach((point) => {
        const myGeoObject = new maps.GeoObject({
          geometry: {
            type: 'Point', // тип геометрии - точка
            coordinates: [point.lat, point.lon], // координаты точки
          },
        });

        map.geoObjects.add(myGeoObject);
      });
    })
    .catch((error) => console.log('Failed to load Yandex Maps', error));
}
