
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
        document.getElementById('refineSearch').style.display = 'none';
        loadGoogleMaps();
        displayBetterDoctorData()
    }else{
        document.getElementById('refineSearch').style.display = 'block';
        displayNoDoctors();
    }
}

let displayNoDoctors = () => {
    console.log('displayNoDoctors');
    document.getElementById('refineSearch').innerHTML = '';
    
    let doctorHeader = document.createElement('div');
        doctorHeader.className = 'refineHeader';
        doctorHeader.innerHTML = '<h4 class="h4">Refine Search Results</h4>';
        document.getElementById('refineSearch').append(doctorHeader);

    let userSelect = document.createElement('div');
        userSelect.id = 'userSelections';
        document.getElementById('refineSearch').append(userSelect);

    let counter = 0;

    if(currentSession.selectedInsuranceID.length > 0){
    let newDiv = document.createElement('div');
        newDiv.id = 'insuranceUID_' + counter;
        newDiv.className = 'insurer text-center';
        newDiv.innerHTML = currentSession.selectedInsuranceID + '</br>' + 'REMOVE X';
        newDiv.addEventListener('click', function(e){
            console.log(e.target.id);
            
            currentSession.selectedInsuranceID = '';
        })
        document.getElementById('userSelections').append(newDiv);
        counter++;
    }

    for(let b of currentSession.selectedSymptomIDs){
        let newDiv = document.createElement('div');
            newDiv.id = 'symptoms_' + counter;
            newDiv.setAttribute('data-symptomsUID', b);
            newDiv.className = 'specialistItem text-center';
            newDiv.innerHTML = b + '</br>remove X';
            newDiv.addEventListener('click', function(e){
                
                let removeSymp = document.getElementById(e.target.id).getAttribute('data-symptomsUID');
                currentSession.selectedSymptomIDs.splice(currentSession.selectedSymptomIDs.indexOf(removeSymp), 1);
                
                document.getElementById(e.target.id).remove();
            })
            document.getElementById('userSelections').append(newDiv);
            counter++;
    }

    for(let c of currentSession.selectedSpecialistIDs){
        let newDiv = document.createElement('div');
            newDiv.id = 'specialist_' + counter;
            newDiv.setAttribute('data-specialistUID', c);
            
            newDiv.className = 'specialistItem text-center';
            newDiv.innerHTML = c + '</br>remove X';
            newDiv.addEventListener('click', function(e){
                
                let removeSpecialist = document.getElementById(e.target.id).getAttribute('data-specialistUID');
                currentSession.selectedSpecialistIDs.splice(currentSession.selectedSpecialistIDs.indexOf(removeSpecialist), 1);
                
                document.getElementById(e.target.id).remove();
            })
            document.getElementById('userSelections').append(newDiv);
            counter++;
    }
    
    
}

function displayBetterDoctorData(){
    document.getElementById('findADoctorList').innerHTML = '';

    for (var i = 0; i < currentSession.doctorsData.length; i++) {
        console.log(currentSession.doctorsData)
        if(currentSession.doctorsData[i].practices.length > 0){
            let doctorDiv = document.createElement('div');
            doctorDiv.id = 'Doctor_Result_' + i;
            doctorDiv.className = 'docResult text-left';
            document.getElementById('findADoctorList').append(doctorDiv);

            let doctorHeader = document.createElement('div');
            doctorHeader.className = 'doctorHeader';
            doctorHeader.innerHTML = '<h4 class="h4">' + currentSession.doctorsData[i].practices[0].name + '</h4>';

            document.getElementById('Doctor_Result_' + i).append(doctorHeader);

            let Address = currentSession.doctorsData[i].practices[0].visit_address.street;
            let Address2 = currentSession.doctorsData[i].practices[0].visit_address.street2;
            let phoneNumber = formatPhoneNumber(currentSession.doctorsData[i].practices[0].phones[0].number)

            if(Address2 != undefined && Address2.length > 0){
                Address += '</br>' + Address2;
            }

            let doctorInfo = document.createElement('div');
            doctorInfo.className = 'doctorParagraph text-justify';
            doctorInfo.innerHTML = '<p class="p">' + currentSession.doctorsData[i].profile.bio + '</p>' + '<p class="p text-center"><strong>' + Address + '</br>' 
            + currentSession.doctorsData[i].practices[0].visit_address.state + ', ' + currentSession.doctorsData[i].practices[0].visit_address.zip + '</br>' +
            phoneNumber + '</strong></p>'

            document.getElementById('Doctor_Result_' + i).append(doctorInfo);

        }

    }
}

let formatPhoneNumber = (number) => {
    const regex = /^(\d{3})(\d{3})(\d{4})/gm;
    const str = number;
    let m;
    let phoneArray = []

    while ((m = regex.exec(str)) !== null) {

        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        
        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            if(groupIndex > 0){
                phoneArray.push(match)
            }
        });
    }
    return phoneArray[0] + '-' + phoneArray[1] + '-' + phoneArray[2];
}