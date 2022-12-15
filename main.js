import "./style.css";
import javascriptLogo from "./javascript.svg";
import { setupCounter } from "./counter.js";

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="/vite.svg" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

document.querySelector("#app").innerHTML = `
	<div id="container">
	<img id="image" width="50%" src="https://static01.nyt.com/images/2022/10/31/well/WELL-CROWD-CRUSH1/WELL-CROWD-CRUSH1-videoSixteenByNine3000.jpg"/>
	</div>
	<button id="button" style="margin:auto">Where is my daddy ????</button>`;

// Récupération de l'élément HTML qui contient l'image
const imgElement = document.getElementById("image");

// Récupération de l'élément HTML qui contient le bouton
const buttonElement = document.getElementById("button");

const container = document.getElementById("container");

// Ajout d'un gestionnaire d'événement pour l'événement "click" sur le bouton
buttonElement.addEventListener("click", () => {
  // Récupération de l'élément HTML qui contient le cercle rouge, s'il existe
  const existingCircle = container.querySelector(".red-circle");

  // Si le cercle rouge existe déjà, on le supprime
  if (existingCircle) {
    existingCircle.remove();
  }

  // Calcul des dimensions de l'image
  const imgRect = imgElement.getBoundingClientRect();

  // Génération d'une position aléatoire pour le cercle rouge
  const x = Math.random() * imgRect.width;
  const y = Math.random() * imgRect.height;

  // Création du cercle rouge
  const circle = document.createElement("div");
  circle.classList.add("red-circle");
  circle.style.position = "absolute";
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
  circle.style.width = "50px";
  circle.style.height = "50px";
  circle.style.borderRadius = "50%";
  circle.style.backgroundColor = "transparent";
  circle.style.border = "5px solid red";

  // Ajout du cercle rouge à l'image
  container.appendChild(circle);
});
