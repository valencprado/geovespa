console.log('ddd')
import latlngs from './coordenate.js'
import circulo from '../../libs/circulo.js';



const map =window.map

map.on('click', (e) => {
    console.log(e)
});

/*
const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 14,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
*/

const polygon = L.polygon(latlngs, {
    color: 'blue',
    fillColor: 'transparent',
}).addTo(map);



function onMapClick(e) {
    console.log(`[${e.latlng.lat},${e.latlng.lng}],`)


}

map.on('click', onMapClick);
