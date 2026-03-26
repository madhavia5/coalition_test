document.addEventListener("DOMContentLoaded", function () {

    fetch("PASTE_REAL_API_ENDPOINT_HERE")
        .then(response => response.json())
        .then(data => {

            const jessica = data.find(
                patient => patient.name === "Jessica Taylor"
            );

            if (jessica) {
                populateUI(jessica);
                createChart(jessica.diagnosis_history);
            }

        })
        .catch(error => console.error("API Error:", error));

});


function populateUI(patient) {
    document.getElementById("patient-name").textContent = patient.name;
    document.getElementById("patient-age").textContent = "Age: " + patient.age;
}


function createChart(history) {

    const labels = history.map(item => item.year);

    const systolic = history.map(
        item => item.blood_pressure.systolic.value
    );

    const diastolic = history.map(
        item => item.blood_pressure.diastolic.value
    );

    const ctx = document.getElementById("bpChart").getContext("2d");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                { label: "Systolic", data: systolic },
                { label: "Diastolic", data: diastolic }
            ]
        }
    });
}