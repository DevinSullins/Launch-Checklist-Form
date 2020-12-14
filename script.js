// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/


let form = document.getElementById("fields");
let fieldNames = [
   form.pilotName,
   form.copilotName,
   form.fuelLevel,
   form.cargoMass
];
let launchStatus = document.getElementById("launchStatus");
let shuttleReady = "Shuttle ready for launch";
let shuttleNotReady = "Shuttle not ready for launch";

let launchReady = (e) => {
   launchStatus.innerText = shuttleReady;
   launchStatus.style.color = "green";
   document.getElementById("faultyItems").style.visibility = "visible";
   e.preventDefault();
};
let planets = [] //to be filled with fetch below

fetch('https://handlers.education.launchcode.org/static/planets.json').then((response) => {
      response.json().then((json) => {
            for (let planet of json){
               planets.push(planet);
            };
      });
});


form.addEventListener("submit", (e) => {
   //change pilot and copilot status
   document.getElementById("pilotStatus").innerText = `Pilot ${form.pilotName.value} Ready`;
   document.getElementById("copilotStatus").innerText = `Copilot ${form.copilotName.value} Ready`;

   launchReady(e) //this runs hidden first and is changed below if data is invalid

   //detect blanks and invalid data, throw alert if any blanks or invalid data
   let blanks = 0;
   for (let field of fieldNames) {
      if (field.value === ""){
         blanks++;
      }
   }
   if (blanks > 0) {
      alert("Blank field detected");
      e.preventDefault();
   } else if (!isNaN(Number(form.pilotName.value)) || !isNaN(Number(form.copilotName.value))){
      alert(`Please enter Pilot and Copilot names, not ID numbers`);
      e.preventDefault();
   } else if (isNaN(Number(form.fuelLevel.value)) || isNaN(Number(form.cargoMass.value))){
      alert(`Fuel Level (L) and Cargo Mass (kg) must be submitted as numerical values`);
      e.preventDefault();
   }
   //validate and display fuelLevel value
   if (Number(form.fuelLevel.value) < 10000){
      // console.log(form.fuelLevel.value)
      launchStatus.innerText = shuttleNotReady;
      launchStatus.style.color = "red";
      document.getElementById("faultyItems").style.visibility = "visible";
      document.getElementById("fuelStatus").innerText = `Fuel Level ${form.fuelLevel.value}L insufficient for launch`;
      e.preventDefault();
   } else {
      document.getElementById("fuelStatus").innerText = `Fuel Level ${form.fuelLevel.value}L high enough for launch`;
      e.preventDefault();

   }

   //validate and display cargoMass value
   if (Number(form.cargoMass.value) > 10000){
      // console.log(form.cargoMass.value)
      launchStatus.innerText = shuttleNotReady;
      launchStatus.style.color = "red";
      document.getElementById("faultyItems").style.visibility = "visible";
      document.getElementById("cargoStatus").innerText = `Cargo weight ${form.cargoMass.value}kg exceeds shuttle limits for launch`;
      e.preventDefault();
   } else {
      document.getElementById("cargoStatus").innerText = `Cargo weight ${form.cargoMass.value}kg low enough for launch`;
      e.preventDefault();  
   };
   
});
