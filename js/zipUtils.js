/**
 * Creates a zip file containing patient data
 * Uses JSZip and saveAs from CDN (loaded globally in index.html)
 * @param {Object} patient - Patient object with all data
 */
export async function downloadPatientDataAsZip(patient) {
    // JSZip and saveAs are available globally from CDN
    const zip = new JSZip();
    
    // Create patient info text file
    const patientInfo = createPatientInfoText(patient);
    zip.file("patient_info.txt", patientInfo);
    
    // Create JSON data file
    zip.file("patient_data.json", JSON.stringify(patient, null, 2));
    
    // Create diagnosis history CSV
    const csvContent = createDiagnosisHistoryCSV(patient.diagnosis_history);
    zip.file("diagnosis_history.csv", csvContent);
    
    // Generate and download the zip file
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `${patient.name.replace(/\s+/g, '_')}_data.zip`);
}

/**
 * Creates a formatted text string with patient information
 */
function createPatientInfoText(patient) {
    let info = `PATIENT INFORMATION\n`;
    info += `==================\n\n`;
    info += `Name: ${patient.name}\n`;
    info += `Age: ${patient.age}\n`;
    info += `Gender: ${patient.gender}\n`;
    info += `ID: ${patient.id}\n\n`;
    
    info += `VITALS\n`;
    info += `------\n`;
    if (patient.vitals) {
        if (patient.vitals.respiratory_rate) {
            info += `Respiratory Rate: ${patient.vitals.respiratory_rate.value} ${patient.vitals.respiratory_rate.unit}\n`;
        }
        if (patient.vitals.temperature) {
            info += `Temperature: ${patient.vitals.temperature.value} ${patient.vitals.temperature.unit}\n`;
        }
        if (patient.vitals.heart_rate) {
            info += `Heart Rate: ${patient.vitals.heart_rate.value} ${patient.vitals.heart_rate.unit}\n`;
        }
    }
    
    return info;
}

/**
 * Creates CSV content from diagnosis history
 */
function createDiagnosisHistoryCSV(history) {
    if (!history || !history.length) return "";
    
    let csv = "Month,Year,Systolic,Diastolic\n";
    
    history.forEach(item => {
        const systolic = item.blood_pressure?.systolic?.value || "";
        const diastolic = item.blood_pressure?.diastolic?.value || "";
        csv += `${item.month},${item.year},${systolic},${diastolic}\n`;
    });
    
    return csv;
}

