export function renderChart(diagnosisHistory) {
  const ctx = document.getElementById("bpChart").getContext("2d");

  const labels = diagnosisHistory.map(item => `${item.month} ${item.year}`);
  const systolic = diagnosisHistory.map(item => item.blood_pressure.systolic.value);
  const diastolic = diagnosisHistory.map(item => item.blood_pressure.diastolic.value);

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Systolic",
          data: systolic,
          borderColor: "#FF6384",
          backgroundColor: "rgba(255, 99, 132, 0.1)",
          tension: 0.3,
          fill: true
        },
        {
          label: "Diastolic",
          data: diastolic,
          borderColor: "#36A2EB",
          backgroundColor: "rgba(54, 162, 235, 0.1)",
          tension: 0.3,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          min: 50,
          max: 160
        }
      }
    }
  });
}
