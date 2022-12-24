import "./style.css";
import mapboxgl from "mapbox-gl"; // Récupère l'élément HTML représentant le bouton

var isPopUpShowed = false;

document
  .getElementById("random-button")
  .addEventListener("click", placeNewPoint);
document.querySelector(".btn--reload").addEventListener("click", () => {
  window.location.reload();
});

var mapContainer = document.getElementById("map");

mapboxgl.accessToken =
  "pk.eyJ1IjoibW9kZXJlIiwiYSI6ImNsYnBtbHRuaDA5Zzgzb2xlaG5wOHhqdDgifQ._VQnRVKLWzg2H--6Md8FUQ";

var map = new mapboxgl.Map({
  container: mapContainer,
  style: "mapbox://styles/mapbox/satellite-streets-v12",
  center: [-74.5, 40],
  zoom: 1,
});

function placeNewPoint() {
  document
    .querySelector("#titleScreen")
    .classList.add("titleScreen-transition");
  document
    .querySelector("#slidingScreen")
    .classList.add("slidingScreen-transition");
  // Génère des coordonnées géographiques au hasard
  var lat = Math.random() * (51.03457 - 41.59101) + 41.59101;
  var lng = Math.random() * (9.45 - -4.65) + -4.65;

  const el = document.createElement("div");
  el.className = "marker";

  var marker = new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map);

  map.flyTo({
    center: [lng, lat],
    duration: 7000,
    essential: true, // this animation is considered essential with respect to prefers-reduced-motion
    zoom: 7,
  });

  map.on("moveend", () => {
    const markerElmt = document
      .querySelector(".mapboxgl-marker")
      .getBoundingClientRect();
    getLayerType(markerElmt.top, markerElmt.right);
  });
}

function getLayerType(x, y) {
  const features = map.queryRenderedFeatures([x, y]);

  // Limit the number of properties we're displaying for
  // legibility and performance
  const displayProperties = ["layer"];

  const displayFeatures = features.map((feat) => {
    const displayFeat = {};
    displayProperties.forEach((prop) => {
      displayFeat[prop] = feat[prop];
    });
    return displayFeat;
  });
}

function showPopUp() {
  if (!isPopUpShowed) {
    document
      .querySelector(".pop-up__container")
      .classList.add("pop-up__container--show");
  }
}
