const alphabetArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

const currentSession = {}

let init = () => {
    grabInsuranceList();


    document.getElementsByClassName('skipBTN')[0].addEventListener('click', function(){
        switch(currentSession.currentSection){
            case 'Insurance':
                document.getElementById('insuranceSection').classList.remove("active");
                document.getElementById('insuranceSection').classList.add("inactive");
                document.getElementById('symptomsSection').classList.remove("inactive");
                document.getElementById('symptomsSection').classList.add("active");
                document.getElementById('insuranceProviders').style.display = 'none';
                document.getElementById('symptomsDiv').style.display = 'block';
                showNextSection('InsuranceDone');
            break;
        }
    });

    document.getElementsByClassName('nextBTN')[0].addEventListener('click', function(){
        switch(currentSession.currentSection){
            case 'Insurance':
                document.getElementById('insuranceSection').classList.remove("active");
                document.getElementById('insuranceSection').classList.add("inactive");
                document.getElementById('symptomsSection').classList.remove("inactive");
                document.getElementById('symptomsSection').classList.add("active");
                document.getElementById('insuranceProviders').style.display = 'none';
                document.getElementById('symptomsDiv').style.display = 'block';
                showNextSection('InsuranceDone');
            break;
        }
    });
};

let grabInsuranceList = () => {
    let api_key = '640a0de3d6429a55be1d99d3c6148b19'
    let insurance_URL = 'https://api.betterdoctor.com/2016-03-01/insurances?user_key='

    getData(insurance_URL + api_key, 'GET', structureInsuranceData);
};

let structureInsuranceData = (data) => {
    currentSession.insuranceData = data.data;
    currentSession.insuranceArray = [];
    for(let a of data.data){
        currentSession.insuranceArray.push([a.name, a]);
    }
    currentSession.insuranceArray.sort();

    displayInsuranceTab();
};

let displayInsuranceTab = () => {
   currentSession.currentSection = 'Insurance';

    for(let a of alphabetArray){
        let newDiv = document.createElement('div');
        newDiv.id = a + '_section';
        newDiv.className = 'insuranceSectionLetter'
        newDiv.innerHTML = a.toUpperCase();
        newDiv.setAttribute('data-section', a.toLocaleUpperCase());
                
        newDiv.addEventListener('click', function(e){
            console.log($(this).attr('data-section'))
            if(currentSession.currentInsuranceSection != $(this).attr('data-section')){
                setupInsuranceList($(this).attr('data-section'), $(this).attr('data-insurerIndex'));
            }
        })

        newDiv.addEventListener('mouseover', function(e){
            document.getElementById(e.target.id).style.color = 'darkblue';
        })

        newDiv.addEventListener('mouseleave', function(e){
            document.getElementById(e.target.id).style.color = 'lightblue';
        })

        document.getElementById('InsuranceAlphabetList').appendChild(newDiv);
    }

    setupInsuranceList('A');
}

let setupInsuranceList = (section) => {
    document.getElementById('insuranceList').innerHTML = '';
    
    for(let a = 0; a < currentSession.insuranceArray.length; a++){
        if(section === currentSession.insuranceArray[a][0].charAt(0).toUpperCase()){
            let newDiv = document.createElement('div');
                newDiv.id = currentSession.insuranceArray[a][0];
                newDiv.setAttribute('data-insuranceUID', currentSession.insuranceArray[a][1].uid);
                newDiv.setAttribute('data-insurerIndex', a);
                newDiv.className = 'insurer text-left';
                newDiv.textContent = currentSession.insuranceArray[a][0]
                
                newDiv.addEventListener('click', function(e){
                    console.log(document.getElementById(e.target.id).getAttribute('data-insuranceUID'));
                    console.log(document.getElementById(e.target.id).getAttribute('data-insurerIndex'))
                    
                    currentSession.selectedInsuranceID_index = document.getElementById(e.target.id).getAttribute('data-insurerIndex');
                    console.log(currentSession.insuranceArray[currentSession.selectedInsuranceID_index][1].plans)
                    if(currentSession.insuranceArray[currentSession.selectedInsuranceID_index][1].plans.length > 1){
                        displayInsuranceSubSection(currentSession.selectedInsuranceID_index);
                    }else{
                        currentSession.selectedInsuranceID = currentSession.insuranceArray[currentSession.selectedInsuranceID_index][1].plans[0].uid;
                        
                        document.getElementById(e.target.id).style.backgroundColor = 'darkBlue';
                        document.getElementById('insuranceProviders').children[4].style.display = 'inline-block';
                    }
                    document.getElementById('insuranceProviders').children[3].style.display = 'none';
                    
                });
                document.getElementById('insuranceList').append(newDiv);
        }
    }
    document.getElementById('insuranceProviders').children[3].style.display = 'inline-block';
}

let displayInsuranceSubSection = (index) => {
    let parentDiv = document.getElementById('insuranceList');
    parentDiv.innerHTML = '';

    for(let a = 0; a < currentSession.insuranceArray[index][1].plans.length; a++){
        console.log(currentSession.insuranceArray[index][1].plans[a])
        if(currentSession.insuranceArray[index][1].plans[a].category[0] === 'medical'){
            let newDiv = document.createElement('div');
                newDiv.id = 'subInsurer_' + a;
                newDiv.setAttribute('data-insuranceUID', currentSession.insuranceArray[index][1].plans[a].uid);
                newDiv.className = 'subInsurer';
                newDiv.textContent = currentSession.insuranceArray[index][1].plans[a].name;
                
                newDiv.addEventListener('click', function(e){
                    currentSession.selectedInsuranceID = document.getElementById(e.target.id).getAttribute('data-insuranceUID');
                    document.getElementById(e.target.id).style.backgroundColor = 'darkBlue';
                    
                    document.getElementById('insuranceProviders').children[4].style.display = 'inline-block';
                    document.getElementById('insuranceProviders').children[3].style.display = 'none';
                });
                parentDiv.append(newDiv);
            }
    }
        document.getElementById('insuranceProviders').children[3].style.display = 'inline-block';
}

let grabSymptomList = () => {
    let api_key = '640a0de3d6429a55be1d99d3c6148b19'
    let insurance_URL = 'https://api.betterdoctor.com/2016-03-01/conditions?user_key='

    getData(insurance_URL + api_key, 'GET', structureSymptomData);
};

let structureSymptomData = (data) => {
    currentSession.symptomData = data.data;
    currentSession.symptomArray = [];

    for(let a of data.data){
        a.name = a.name.charAt(0).toUpperCase() + a.name.slice(1);
        currentSession.symptomArray.push([a.name, a]);
    }
    currentSession.symptomArray.sort();

    displaySymptomData();
};

let displaySymptomData = () => {
    
};


let showNextSection = (completedTask) => {
    switch (completedTask){
        case 'InsuranceDone':
            currentSession.currentSection = 'Symptom';
            grabSymptomList();
        break;
    }
}

let getData = (url, method, callBackFunc) => {
    $.ajax({
        url: url,
        method: method
    }).then(function(data){
        callBackFunc(data)
    });
}


