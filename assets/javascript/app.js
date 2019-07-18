const alphabetArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

const currentSession = {}

let init = () => {
    grabInsuranceList();

    setupBtnListeners();
};

let grabInsuranceList = () => {
    let api_key = '640a0de3d6429a55be1d99d3c6148b19'
    let insurance_URL = 'https://api.betterdoctor.com/2016-03-01/insurances?user_key='

    getData(insurance_URL + api_key, 'GET', structureInsuranceData);
};

let structureInsuranceData = (data) => {
    currentSession.insuranceData = data.data;
    currentSession.insuranceArray = [];
    for (let a of data.data) {
        currentSession.insuranceArray.push([a.name, a]);
    }
    currentSession.insuranceArray.sort();

    displayInsuranceTab();
};

let displayInsuranceTab = () => {
    currentSession.currentSection = 'Insurance';
    
    // This defines "found match"
    for(let a of alphabetArray) { 
        var foundMatch = false;

        // This variable grabs the first letter of the insurance company and makes it lower case. 
        for(var j = 0; j < currentSession.insuranceArray.length; j++) {
            var firstInsuranceChar = currentSession.insuranceArray[j][0].charAt(0).toLowerCase();

            // This is Check to see if there is a Match
            if(!foundMatch) {
                // This block checks to see if last company on list and no match, just diaply disabled letter
                if(j == currentSession.insuranceArray.length - 1 && a != firstInsuranceChar) {
                    let newDiv = document.createElement('div');
                    newDiv.innerHTML = a.toUpperCase();
                    newDiv.className = "insuranceNoLetter";
                    document.getElementById('InsuranceAlphabetList').appendChild(newDiv);
                } else {
                    if(a == firstInsuranceChar) {
                        let newDiv = document.createElement('div');
                        newDiv.innerHTML = a.toUpperCase();
                        newDiv.id = a + '_section';
                        newDiv.className = 'insuranceSectionLetter'
                        newDiv.setAttribute('data-section', a.toLocaleUpperCase());

                        newDiv.addEventListener('click', function (e) {
                            console.log($(this).attr('data-section'))
                            if (currentSession.currentInsuranceSection != $(this).attr('data-section')) {
                                currentSession.currentInsuranceSection = $(this).attr('data-section');
                                setupInsuranceList($(this).attr('data-section'), $(this).attr('data-insurerIndex'));
                            }
                        })

                        // newDiv.addEventListener('mouseover', function (e) {
                        //     document.getElementById(e.target.id).style.color = 'darkblue';
                        // })

                        // newDiv.addEventListener('mouseleave', function (e) {
                        //     document.getElementById(e.target.id).style.color = 'lightblue';
                        // })

// Found a Match and True
                        foundMatch = true;

                        document.getElementById('InsuranceAlphabetList').appendChild(newDiv);
                    }
                }
            }
        }
    }

    // for (var i = 0; i < alphabetArray.length; i++) {
    //     var emptyLetterArray = [];
    //         console.log(alphabetArray[i])
    //     for (var j = 0; j < insuranceArray.length; j++) {
    //         console.log(currentSession.insuranceArray[j].charAt(0))
    //         if (alphabetArray[i] == currentSession.insuranceArray[j].charAt(0)) {
    //             currentSession.insuranceArray.push(emptyLetterArray);

    //         }

    //     }
    // }


    currentSession.currentInsuranceSection = 'A';
    setupInsuranceList('A');
}

let setupInsuranceList = (section) => {
    document.getElementById('insuranceList').innerHTML = '';

    for (let a = 0; a < currentSession.insuranceArray.length; a++) {
        if (section === currentSession.insuranceArray[a][0].charAt(0).toUpperCase()) {
            let newDiv = document.createElement('div');
            newDiv.id = currentSession.insuranceArray[a][0];
            newDiv.setAttribute('data-insuranceUID', currentSession.insuranceArray[a][1].uid);
            newDiv.setAttribute('data-insurerIndex', a);
            newDiv.className = 'insurer text-left';
            newDiv.textContent = currentSession.insuranceArray[a][0]

            newDiv.addEventListener('click', function (e) {
                console.log(document.getElementById(e.target.id).getAttribute('data-insuranceUID'));
                console.log(document.getElementById(e.target.id).getAttribute('data-insurerIndex'))

                currentSession.selectedInsuranceID_index = document.getElementById(e.target.id).getAttribute('data-insurerIndex');
                console.log(currentSession.insuranceArray[currentSession.selectedInsuranceID_index][1].plans)
                if (currentSession.insuranceArray[currentSession.selectedInsuranceID_index][1].plans.length > 1) {
                    displayInsuranceSubSection(currentSession.selectedInsuranceID_index);
                } else {
                    for (let i = 0; i < document.getElementById('insuranceList').children.length; i++) {
                        document.getElementById('insuranceList').children[i].style.backgroundColor = 'lightblue'
                    }
                    currentSession.selectedInsuranceID = currentSession.insuranceArray[currentSession.selectedInsuranceID_index][1].plans[0].uid;

                    document.getElementById(e.target.id).style.backgroundColor = 'darkBlue';
                    document.getElementById('insuranceSection').children[4].style.display = 'inline-block';
                }
                document.getElementById('insuranceSection').children[3].style.display = 'none';

            });
            document.getElementById('insuranceList').append(newDiv);
        }
    }
    document.getElementById('insuranceSection').children[3].style.display = 'inline-block';
}





let displayInsuranceSubSection = (index) => {
    let parentDiv = document.getElementById('insuranceList');
    parentDiv.innerHTML = '';

    for (let a = 0; a < currentSession.insuranceArray[index][1].plans.length; a++) {
        console.log(currentSession.insuranceArray[index][1].plans[a])
        if (currentSession.insuranceArray[index][1].plans[a].category[0] === 'medical') {
            let newDiv = document.createElement('div');
            newDiv.id = 'subInsurer_' + a;
            newDiv.setAttribute('data-insuranceUID', currentSession.insuranceArray[index][1].plans[a].uid);
            newDiv.className = 'subInsurer';
            newDiv.textContent = currentSession.insuranceArray[index][1].plans[a].name;

            newDiv.addEventListener('click', function (e) {
                for (let i = 0; i < document.getElementById('insuranceList').children.length; i++) {
                    document.getElementById('insuranceList').children[i].style.backgroundColor = 'lightblue'
                }
                currentSession.selectedInsuranceID = document.getElementById(e.target.id).getAttribute('data-insuranceUID');
                document.getElementById(e.target.id).style.backgroundColor = 'darkBlue';

                document.getElementById('insuranceSection').children[4].style.display = 'inline-block';
                document.getElementById('insuranceSection').children[3].style.display = 'none';
            });
            parentDiv.append(newDiv);
        }
    }
    document.getElementById('insuranceSection').children[3].style.display = 'inline-block';
}





let grabSymptomList = () => {
    let api_key = '640a0de3d6429a55be1d99d3c6148b19'
    let insurance_URL = 'https://api.betterdoctor.com/2016-03-01/conditions?user_key='

    getData(insurance_URL + api_key, 'GET', structureSymptomData);
};

let structureSymptomData = (data) => {
    currentSession.symptomData = data.data;
    currentSession.symptomArray = [];

    for (let a of data.data) {
        a.name = a.name.charAt(0).toUpperCase() + a.name.slice(1);
        currentSession.symptomArray.push([a.name, a]);
    }
    currentSession.symptomArray.sort();

    displaySymptomTab();
};

let displaySymptomTab = () => {
    currentSession.currentSection = 'Symptoms';
    currentSession.selectedSymptomIDs = [];

    for (let a of alphabetArray) {
        var foundMatch = false;
        for(var j = 0; j < currentSession.symptomArray.length; j++) {
            var firstSympChar = currentSession.symptomArray[j][0].charAt(0).toLowerCase();

            // This is Check to see if there is a Match
            if(!foundMatch) {
                // This block checks to see if last company on list and no match, just diaply disabled letter
                if(j == currentSession.symptomArray.length - 1 && a != firstSympChar) {
                    let newDiv = document.createElement('div');
                    newDiv.innerHTML = a.toUpperCase();
                    newDiv.className = "symptomNoLetter";
                    document.getElementById('symptomAlphabetList').appendChild(newDiv);
                } else {
                    if(a == firstSympChar) {
                        let newDiv = document.createElement('div');
                        newDiv.id = a + '_Symptom_Section';
                        newDiv.className = 'symptomSectionLetter'
                        newDiv.innerHTML = a.toUpperCase();
                        newDiv.setAttribute('data-section', a.toLocaleUpperCase());

                        newDiv.addEventListener('click', function (e) {
                            console.log($(this).attr('data-section'))
                            if (currentSession.currentSymptomSection != $(this).attr('data-section')) {
                                currentSession.currentSymptomSection = $(this).attr('data-section');
                                setupSymptomList($(this).attr('data-section'));
                            }
                        })

                        // newDiv.addEventListener('mouseover', function (e) {
                        //     document.getElementById(e.target.id).style.color = 'darkblue';
                        // })

                        // newDiv.addEventListener('mouseleave', function (e) {
                        //     document.getElementById(e.target.id).style.color = 'lightblue';
                        // })

                        foundMatch = true;

                        document.getElementById('symptomAlphabetList').appendChild(newDiv);
                    }
                }
            }
        }
    }
        currentSession.currentSymptomSection = 'A';
        setupSymptomList('A');
};

let setupSymptomList = (section) => {
    document.getElementById('symptomList').innerHTML = '';

    for (let a = 0; a < currentSession.symptomArray.length; a++) {
        if (section === currentSession.symptomArray[a][0].charAt(0).toUpperCase()) {
            let newDiv = document.createElement('div');
            newDiv.id = currentSession.symptomArray[a][0];
            newDiv.setAttribute('data-symptomUID', currentSession.symptomArray[a][1].uid);


            newDiv.className = 'symptomItem text-left';
            newDiv.textContent = currentSession.symptomArray[a][0]

            newDiv.addEventListener('click', function (e) {
                console.log(document.getElementById(e.target.id).getAttribute('data-symptomUID'));
                let currentUID = currentSession.selectedSymptomIDs.indexOf(document.getElementById(e.target.id).getAttribute('data-symptomUID'));
                console.log(currentUID)
                if (currentUID <= -1) {
                    document.getElementById(e.target.id).style.backgroundColor = 'darkBlue';
                    currentSession.selectedSymptomIDs.push(document.getElementById(e.target.id).getAttribute('data-symptomUID'));
                } else {
                    let index = currentSession.selectedSymptomIDs.indexOf(document.getElementById(e.target.id).getAttribute('data-symptomUID'))
                    if (index > -1) {
                        currentSession.selectedSymptomIDs.splice(index, 1)
                    }
                    document.getElementById(e.target.id).style.backgroundColor = 'lightblue';
                }

                document.getElementById('symptomSection').children[4].style.display = 'inline-block';
                document.getElementById('symptomSection').children[3].style.display = 'none';

            });
            document.getElementById('symptomList').append(newDiv);
        }
    }
    document.getElementById('symptomSection').children[3].style.display = 'inline-block';
}

let grabSpecialistList = () => {
    let api_key = '640a0de3d6429a55be1d99d3c6148b19'
    let specialist_URL = 'https://api.betterdoctor.com/2016-03-01/specialties?user_key='

    getData(specialist_URL + api_key, 'GET', structureSpecialistData);
}

let structureSpecialistData = (data) => {
    currentSession.specialistData = data.data;
    currentSession.specialistArray = [];

    for (let a of data.data) {
        a.name = a.name.charAt(0).toUpperCase() + a.name.slice(1);
        currentSession.specialistArray.push([a.name, a]);
    }
    currentSession.specialistArray.sort();

    displaySpecialistTab();
}

let displaySpecialistTab = () => {
    currentSession.currentSection = 'Specialist';
    currentSession.selectedSpecialistIDs = [];

    for (let a of alphabetArray) {
        var foundMatch = false;
        for(var j = 0; j < currentSession.specialistArray.length; j++) {
            var firstSpecialistChar = currentSession.specialistArray[j][0].charAt(0).toLowerCase();

            // This is Check to see if there is a Match
            if(!foundMatch) {
                // This block checks to see if last company on list and no match, just diaply disabled letter
                if(j == currentSession.specialistArray.length - 1 && a != firstSpecialistChar) {
                    let newDiv = document.createElement('div');
                    newDiv.innerHTML = a.toUpperCase();
                    newDiv.className = "specialistNoLetter";
                    document.getElementById('specialistAlphabetList').appendChild(newDiv);
                } else {
                    if(a == firstSpecialistChar) {

                    let newDiv = document.createElement('div');
                    newDiv.id = a + '_Specialist_Section';
                    newDiv.className = 'specialistSectionLetter'
                    newDiv.innerHTML = a.toUpperCase();
                    newDiv.setAttribute('data-section', a.toLocaleUpperCase());

                    newDiv.addEventListener('click', function (e) {
                        console.log($(this).attr('data-section'))
                        if (currentSession.currentSpecialistSection != $(this).attr('data-section')) {
                            currentSession.currentSpecialistSection = $(this).attr('data-section');
                            setupSpecialistList($(this).attr('data-section'));
                        }
                    })

                    // newDiv.addEventListener('mouseover', function (e) {
                    //     document.getElementById(e.target.id).style.color = 'darkblue';
                    // })

                    // newDiv.addEventListener('mouseleave', function (e) {
                    //     document.getElementById(e.target.id).style.color = 'lightblue';
                    // })
                    foundMatch = true;
                    document.getElementById('specialistAlphabetList').appendChild(newDiv);
                }
            }
        }
    }
}
    currentSession.currentSpecialistSection = 'A';
    setupSpecialistList('A');
};

let setupSpecialistList = (section) => {
    document.getElementById('specialistList').innerHTML = '';

    for (let a = 0; a < currentSession.specialistArray.length; a++) {
        if (section === currentSession.specialistArray[a][0].charAt(0).toUpperCase()) {
            let newDiv = document.createElement('div');
            newDiv.id = currentSession.specialistArray[a][0];
            newDiv.setAttribute('data-specialistUID', currentSession.specialistArray[a][1].uid);
            newDiv.className = 'specialistItem text-left';
            newDiv.textContent = currentSession.specialistArray[a][0]

            newDiv.addEventListener('click', function (e) {
                console.log(document.getElementById(e.target.id).getAttribute('data-specialistUID'));
                let currentUID = currentSession.selectedSpecialistIDs.indexOf(document.getElementById(e.target.id).getAttribute('data-specialistUID'));
                console.log(currentUID)
                if (currentUID <= -1) {
                    document.getElementById(e.target.id).style.backgroundColor = 'darkBlue';
                    currentSession.selectedSpecialistIDs.push(document.getElementById(e.target.id).getAttribute('data-specialistUID'));
                } else {
                    let index = currentSession.selectedSpecialistIDs.indexOf(document.getElementById(e.target.id).getAttribute('data-specialistUID'))
                    if (index > -1) {
                        currentSession.selectedSpecialistIDs.splice(index, 1)
                    }
                    document.getElementById(e.target.id).style.backgroundColor = 'lightblue';
                }

                document.getElementById('specialistSection').children[4].style.display = 'inline-block';
                document.getElementById('specialistSection').children[3].style.display = 'none';

            });
            document.getElementById('specialistList').append(newDiv);
        }
    }
    document.getElementById('specialistSection').children[3].style.display = 'inline-block';
}

let showNextSection = (completedTask) => {
    switch (completedTask) {
        case 'InsuranceDone':
            currentSession.currentSection = 'Symptom';
            grabSymptomList();
            break;
        case 'SymptomsDone':
            currentSession.currentSection = 'Specialist';
            grabSpecialistList();
            break;
        case 'SpecialistDone':
            currentSession.currentSection = 'findADoctor';
            setupZipSearch();
            break;
    }
}

let getData = (url, method, callBackFunc) => {
    $.ajax({
        url: url,
        method: method
    }).then(function (data) {
        callBackFunc(data)
    });
}

$(document).ready(function () {
    init();
})

let handleButtonClicks = () => {
    switch (currentSession.currentSection) {
        case 'Insurance':
            document.getElementById('insuranceSection').classList.remove("sectionDisplayed");
            document.getElementById('insuranceSection').classList.add("sectionHidden");
            document.getElementById('symptomSection').classList.remove("sectionHidden");
            document.getElementById('symptomSection').classList.add("sectionDisplayed");
            document.getElementById('navList').children[0].children[0].classList.remove('active');
            document.getElementById('navList').children[1].children[0].classList.remove('disabled');
            document.getElementById('navList').children[0].children[0].classList.add('disabled');
            document.getElementById('navList').children[1].children[0].classList.add('active');

            showNextSection('InsuranceDone');
            break;
        case 'Symptoms':
            document.getElementById('symptomSection').classList.remove("sectionDisplayed");
            document.getElementById('symptomSection').classList.add("sectionHidden");
            document.getElementById('specialistSection').classList.remove("sectionHidden");
            document.getElementById('specialistSection').classList.add("sectionDisplayed");
            document.getElementById('navList').children[1].children[0].classList.remove('active');
            document.getElementById('navList').children[2].children[0].classList.remove('disabled');
            document.getElementById('navList').children[1].children[0].classList.add('disabled');
            document.getElementById('navList').children[2].children[0].classList.add('active');

            showNextSection('SymptomsDone');
            break;
        case 'Specialist':
            document.getElementById('specialistSection').classList.remove("sectionDisplayed");
            document.getElementById('specialistSection').classList.add("sectionHidden");
            document.getElementById('findADoctorSection').classList.remove("sectionHidden");
            document.getElementById('findADoctorSection').classList.add("sectionDisplayed");
            document.getElementById('navList').children[2].children[0].classList.remove('active');
            document.getElementById('navList').children[3].children[0].classList.remove('disabled');
            document.getElementById('navList').children[2].children[0].classList.add('disabled');
            document.getElementById('navList').children[3].children[0].classList.add('active');

            showNextSection('SpecialistDone');
            break;
    }
}

let setupBtnListeners = () => {

    document.getElementsByClassName('skipBTN')[0].addEventListener('click', handleButtonClicks);
    document.getElementsByClassName('skipBTN')[1].addEventListener('click', handleButtonClicks);
    document.getElementsByClassName('skipBTN')[2].addEventListener('click', handleButtonClicks);

    document.getElementsByClassName('nextBTN')[0].addEventListener('click', handleButtonClicks);
    document.getElementsByClassName('nextBTN')[1].addEventListener('click', handleButtonClicks);
    document.getElementsByClassName('nextBTN')[2].addEventListener('click', handleButtonClicks);
}