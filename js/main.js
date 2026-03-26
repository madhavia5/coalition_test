import { fetchPatients } from "./api.js";
import { renderChart } from "./chart.js";
import { downloadPatientDataAsZip } from "./zipUtils.js";

let currentPatient = null;

function populateUI(patient) {
  currentPatient = patient;
  
  document.getElementById("patient-name").textContent = patient.name;
  document.getElementById("patient-details").textContent = `Age: ${patient.age} | Gender: ${patient.gender}`;
  
  if (patient.profile_picture) {
    document.getElementById("patient-img").src = patient.profile_picture;
  }
  
  if (patient.vitals) {
    if (patient.vitals.respiratory_rate) {
      document.getElementById("resp-rate").textContent = `${patient.vitals.respiratory_rate.value} ${patient.vitals.respiratory_rate.unit}`;
    }
    if (patient.vitals.temperature) {
      document.getElementById("temp").textContent = `${patient.vitals.temperature.value} ${patient.vitals.temperature.unit}`;
    }
    if (patient.vitals.heart_rate) {
      document.getElementById("heart-rate").textContent = `${patient.vitals.heart_rate.value} ${patient.vitals.heart_rate.unit}`;
    }
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const data = await fetchPatients();
  
  if (!data || !data.patients) {
    console.error("Invalid API response");
    return;
  }

  const jessica = data.patients.find(
    (patient) => patient.name === "Jessica Taylor"
  );

  if (!jessica) {
    console.error("Jessica Taylor not found");
    return;
  }

  populateUI(jessica);
  renderChart(jessica.diagnosis_history);
  
  // Add click event for zip download button
  document.getElementById("download-zip").addEventListener("click", async () => {
    if (currentPatient) {
      await downloadPatientDataAsZip(currentPatient);
    }
  });
});
