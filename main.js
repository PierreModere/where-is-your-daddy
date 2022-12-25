import "./style.css";
import mapboxgl from "mapbox-gl"; // Récupère l'élément HTML représentant le bouton
import { faker } from "@faker-js/faker";

// sets locale to fr
faker.locale = "fr";

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
    setRandomData();
    showPopUp();
  });
}

function showPopUp() {
  if (!isPopUpShowed) {
    document
      .querySelector(".pop-up__container")
      .classList.add("pop-up__container--show");
    isPopUpShowed = !isPopUpShowed;
  }
}

function addOrdinal(day) {
  // Ajouter "st" pour les jours 1, 21 et 31
  if (day === 1 || day === 21 || day === 31) {
    return `${day}st`;
  }
  // Ajouter "nd" pour les jours 2 et 22
  else if (day === 2 || day === 22) {
    return `${day}nd`;
  }
  // Ajouter "rd" pour les jours 3 et 23
  else if (day === 3 || day === 23) {
    return `${day}rd`;
  }
  // Ajouter "th" pour tous les autres jours
  else {
    return `${day}th`;
  }
}

function randomDate() {
  // Générer des nombres aléatoires pour le jour, le mois et l'année
  var day = Math.floor(Math.random() * 31) + 1;
  var month = Math.floor(Math.random() * 12) + 1;
  var year = Math.floor(Math.random() * 100) + 1950;

  // Créer un tableau de mois en anglais
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Ajouter l'indicateur ordinal en anglais au jour
  day = addOrdinal(day);

  // Retourner la date sous le format demandé
  return `${day} ${months[month - 1]} ${year}`;
}

function randomPlace() {
  // Créer un tableau de types d'établissements
  var establishmentTypes = [
    "bar",
    "restaurant",
    "boite de nuit",
    "parc d'attraction",
  ];

  // Générer un nombre aléatoire pour sélectionner un type d'établissement
  var establishmentType =
    establishmentTypes[Math.floor(Math.random() * establishmentTypes.length)];

  // Générer un nom aléatoire en utilisant l'API de Faker.js en fonction du type d'établissement
  var establishmentName;
  if (establishmentType === "bar") {
    establishmentName = faker.company.companyName() + " Bar";
  } else if (establishmentType === "restaurant") {
    establishmentName = faker.company.companyName() + " Restaurant";
  } else if (establishmentType === "boite de nuit") {
    establishmentName = faker.company.companyName() + " Boîte de nuit";
  } else if (establishmentType === "parc d'attraction") {
    establishmentName = faker.company.companyName() + " Parc d'attraction";
  }
  const adress = faker.address.zipCode() + ", " + faker.address.city();
  return establishmentName + " - " + adress;
}

function setRandomData() {
  document.querySelector(".pop-up__adress").textContent = randomPlace();
  document.querySelector(".pop-up__date").textContent = randomDate();
}
