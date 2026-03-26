// Simple API test script
// Run this in the browser console or as a Node.js script

const API_URL = "https://api.hscc.bdpa.org/v1/health/patients";

async function testAPI() {
  console.log("Testing API connection...");
  
  try {
    const response = await fetch(API_URL);
    
    console.log("Response status:", response.status);
    console.log("Response OK:", response.ok);
    
    const data = await response.json();
    
    console.log("API Response:", data);
    
    // Check if data has patients array
    if (data.patients && Array.isArray(data.patients)) {
      console.log("Number of patients:", data.patients.length);
      
      // Find Jessica Taylor
      const jessica = data.patients.find(p => p.name === "Jessica Taylor");
      
      if (jessica) {
        console.log("✓ Jessica Taylor found!");
        console.log("Jessica's data:", jessica);
      } else {
        console.log("✗ Jessica Taylor not found");
        console.log("Available patients:", data.patients.map(p => p.name));
      }
    } else {
      console.log("✗ No patients array in response");
    }
    
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Run the test
testAPI();

