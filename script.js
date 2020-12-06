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
form.addEventListener("submit", (e) => {
   let blanks = 0
   for (let field of fieldNames) {
      if (field.value === ""){
         blanks++
      }
   };
   if (blanks > 0) {
      alert("Blank field detected")
      e.preventDefault()
   };
   if (!isNaN(Number(form.pilotName.value)) || !isNaN(Number(form.copilotName.value))){
      alert(`Please enter Pilot and Copilot names, not ID numbers`)
      e.preventDefault()
   };
   if (isNaN(Number(form.fuelLevel.value)) || isNaN(Number(form.cargoMass.value))){
      alert(`Fuel Level (L) and Cargo Mass (kg) must be submitted as numerical values`)
      e.preventDefault()
   };
});
