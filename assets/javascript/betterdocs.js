
let pulledData;

let grabDoctorData = () => {
    let api_key = '&user_key=640a0de3d6429a55be1d99d3c6148b19';
    let findADoctor_URL = 'https://api.betterdoctor.com/2016-03-01/doctors?';
    let Location = '&location=' + currentSession.userLat + '%2C' + currentSession.userLon + '%2C25';
    let userLocation = '&user_location=' + currentSession.userLat + '%2C' + currentSession.userLon;
    let insuranceUID = "insurance_uid=";
    let specialityUID = "&specialty_uid=";
    let symptomsUID = "&query=";

    let finalURL = findADoctor_URL;

    if(currentSession.selectedInsuranceID != undefined){
        finalURL += insuranceUID + currentSession.selectedInsuranceID;
    }

    if(currentSession.selectedSymptomIDs != undefined && currentSession.selectedSymptomIDs.length > 0){
        for(let a = 0; a < currentSession.selectedSymptomIDs.length; a++){
            if(a != currentSession.selectedSymptomIDs.length){
                symptomsUID += currentSession.selectedSymptomIDs + '%2C'
            }else{
                symptomsUID += currentSession.selectedSymptomIDs
            }
        }

        finalURL += symptomsUID;     
    }
    if(currentSession.selectedSpecialistIDs != undefined && currentSession.selectedSpecialistIDs.length > 0){
        for(let a = 0; a < currentSession.selectedSpecialistIDs.length; a++){
            if(a != currentSession.selectedSpecialistIDs.length){
                specialityUID += currentSession.selectedSpecialistIDs + '%2C'
            }else{
                specialityUID += currentSession.selectedSpecialistIDs
            }
        }
        finalURL += specialityUID;
    }

    finalURL = finalURL +  Location + userLocation + '&skip=0&limit=10' + api_key;

    getData(finalURL, 'GET', structureDoctorsData);
}

let structureDoctorsData = (data) => {
    let doctorData = data.data;
    currentSession.doctorsData = doctorData;
    if(doctorData.length > 0){
        loadGoogleMaps();
        displayBetterDoctorData()
    }
}

function displayBetterDoctorData(){
    
    for (var i = 0; i < currentSession.doctorsData.length; i++) {
        
    }
}