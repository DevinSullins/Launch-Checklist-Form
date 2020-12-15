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



//get planet data

// let getRandomPlanet = (planetArray) => {
//    let randomNumber = Math.floor(Math.random() * planetArray.length)
//    console.log(randomNumber)
//    console.log(planetArray.randomNumber)
//    return planetArray.randomNumber
// }
const fetchPlanets = async () => { 
   try {
      const response = await fetch('https://handlers.education.launchcode.org/static/planets.json');
      let planets = await response.json();
      let randomNumber = Math.floor(Math.random() * planets.length)
      console.log(planets[randomNumber]);
      return planets[randomNumber]
   }
   catch (err) {
      console.error(err);
   };
}


//status element to be filled in
let launchStatus = document.getElementById("launchStatus");

//status statements
let shuttleReady = "Shuttle ready for launch";
let shuttleNotReady = "Shuttle not ready for launch";

//function to run when all criteria met for launch
let launchReady = (e) => {
   launchStatus.innerText = shuttleReady;
   launchStatus.style.color = "green";
   document.getElementById("faultyItems").style.visibility = "visible";
   e.preventDefault();
};
//function to run when invalid data is found
let launchNotReady = (e) => {
   launchStatus.innerText = shuttleNotReady;
   launchStatus.style.color = "red";
   document.getElementById("faultyItems").style.visibility = "visible";
   e.preventDefault();
};

let form = document.getElementById("fields");
//array of field names for validation
let fieldNames = [
   form.pilotName,
   form.copilotName,
   form.fuelLevel,
   form.cargoMass
];
let missionBriefUpdate = async () => {
   let planet = await fetchPlanets()
   document.getElementById("missionTarget").innerHTML = 
`<h2>Mission Destination</h2>
<ol>
<li>Name: ${planet.name}</li>
<li>Diameter: ${planet.diameter}</li>
<li>Star: ${planet.star}</li>
<li>Distance from Earth: ${planet.distance}</li>
<li>Number of Moons: ${planet.moons}</li>
</ol>
<img src="${planet.image}"></img>`
}
missionBriefUpdate()
form.addEventListener("submit", async (e) => {
   
   launchReady(e) //this runs first and is changed below if data is invalid
   //detect blanks and invalid data, throw alert if any blanks or invalid data
   document.getElementById("pilotStatus").innerText = `Pilot Not Ready`;
   document.getElementById("copilotStatus").innerText = `Copilot Not Ready`;
   
   //detect blank fields
   let blanks = 0;
   for (let field of fieldNames) {
      if (field.value === ""){   
         alert("Blank field detected");    
         launchNotReady(e)       
      }
   }
 
   //validate and display copilot name
   if (typeof form.pilotName.value === "number" || form.pilotName.value === ''){
      alert(`Please enter valid Pilot Name`);
      launchNotReady(e)  
   } else {
      document.getElementById("pilotStatus").innerText = `Pilot ${form.pilotName.value} Ready`;
   }
   //validate and display copilot name
   if (typeof form.copilotName.value === "number" || form.copilotName.value === ''){
      alert(`Please enter valid Copilot Name`);
      launchNotReady(e)
   } else {
      document.getElementById("copilotStatus").innerText = `Copilot ${form.copilotName.value} Ready`;
   }
   
   //validate and display fuelLevel value
   let fuelStatus = document.getElementById("fuelStatus").innerText
   if (isNaN(Number(form.fuelLevel.value))){
      alert(`Fuel Level (L) must be submitted as a numerical value`);
      fuelStatus = `Fuel Level "${form.fuelLevel.value}" invalid`
      launchNotReady(e)
   } else if (Number(form.fuelLevel.value) > 10000){
      fuelStatus = `Fuel Level ${form.fuelLevel.value}L high enough for launch`;
      e.preventDefault();
   } else {
      console.log(form.fuelLevel.value)
      fuelStatus = `Fuel Level ${form.fuelLevel.value}L insufficient for launch`;
      launchNotReady(e);     
   }
   
   //validate and display cargoMass value
   let cargoStatus = document.getElementById("cargoStatus").innerText
   if (isNaN(Number(form.cargoMass.value))){
      alert(`Cargo Mass (kg) must be submitted as a numerical value`);
      cargoStatus = `Cargo weight "${form.cargoMass.value}" invalid`
      launchNotReady(e)
   } else if (Number(form.cargoMass.value) < 10000){  
      cargoStatus = `Cargo weight ${form.cargoMass.value}kg low enough for launch`;
      e.preventDefault(); 

   } else {
      cargoStatus = `Cargo weight ${form.cargoMass.value}kg exceeds shuttle limits for launch`;
      launchNotReady(e);
   };
   
});
