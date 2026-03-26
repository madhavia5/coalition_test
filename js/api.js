const API_URL = "https://api.hscc.bdpa.org/v1/health/patients";
const API_KEY = "i_love_building_websites";

export async function fetchPatients() {
  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    // Return mock data as fallback
    return getMockData();
  }
} 

function getMockData() {
  return {
    patients: [
      {
        id: "PT12345",
        name: "Jessica Taylor",
        age: 28,
        gender: "Female",
        profile_picture: "https://randomuser.me/api/portraits/women/44.jpg",
        vitals: {
          respiratory_rate: { value: 18, unit: "bpm" },
          temperature: { value: 98.6, unit: "°F" },
          heart_rate: { value: 72, unit: "bpm" }
        },
        diagnosis_history: [
          { month: "January", year: 2024, blood_pressure: { systolic: { value: 120 }, diastolic: { value: 80 } } },
          { month: "February", year: 2024, blood_pressure: { systolic: { value: 122 }, diastolic: { value: 82 } } },
          { month: "March", year: 2024, blood_pressure: { systolic: { value: 118 }, diastolic: { value: 78 } } },
          { month: "April", year: 2024, blood_pressure: { systolic: { value: 125 }, diastolic: { value: 85 } } },
          { month: "May", year: 2024, blood_pressure: { systolic: { value: 128 }, diastolic: { value: 86 } } },
          { month: "June", year: 2024, blood_pressure: { systolic: { value: 124 }, diastolic: { value: 84 } } }
        ]
      }
    ]
  };
}
