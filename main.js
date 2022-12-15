import "./style.css";
import mapboxgl from "mapbox-gl"; // Récupère l'élément HTML représentant le bouton
var button = document.getElementById("random-button");

// Récupère l'élément HTML qui contiendra la carte Mapbox
var mapContainer = document.getElementById("map");

// Récupère l'élément HTML qui contiendra la pop-up HTML
var popup = document.getElementById("popup");

// Récupère l'élément HTML représentant le bouton de fermeture de la pop-up
var closeButton = document.getElementById("close-button");

// Initialise la carte Mapbox en utilisant l'élément HTML précédemment récupéré
mapboxgl.accessToken =
  "pk.eyJ1IjoibW9kZXJlIiwiYSI6ImNsYnBtbHRuaDA5Zzgzb2xlaG5wOHhqdDgifQ._VQnRVKLWzg2H--6Md8FUQ";

var map = new mapboxgl.Map({
  container: mapContainer,
  style: "mapbox://styles/mapbox/satellite-streets-v12", // Style de la carte
  center: [-74.5, 40], // Emplacement initial de la carte
  zoom: 1, // Niveau de zoom initial
});

// Ajoute un contrôle de type "bouton" à la carte
map.addControl(
  new mapboxgl.NavigationControl({
    showCompass: false,
  }),
  "top-left"
);
document.querySelector(".mapboxgl-control-container").remove();
function placeNewPoint() {
  document
    .querySelector("#titleScreen")
    .classList.add("titleScreen-transition");

  // Génère des coordonnées géographiques au hasard
  var lat = Math.random() * 180 - 90; // Nombre aléatoire entre -90 et 90
  var lng = Math.random() * 360 - 180; // Nombre aléatoire entre -180 et 180
  console.log(lat, lng);
  // Utilise l'API de Mapbox pour ajouter un nouveau marqueur à l'emplacement spécifié
  // par les coordonnées générées aléatoirement
  var marker = new mapboxgl.Marker({ color: "#EE6464" })
    .setLngLat([lng, lat])
    .addTo(map);

  map.flyTo({
    center: [lng, lat],
    duration: 7000,
    essential: true, // this animation is considered essential with respect to prefers-reduced-motion
    zoom: 9,
  });
}
button.addEventListener("click", placeNewPoint);
