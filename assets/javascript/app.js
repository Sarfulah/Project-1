// This code depends on jQuery Core and Handlebars.js 


var resource_url = 'https://healthservice.priaid.ch/symptoms?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im5tYXJjaW9uZXNlQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiMjcxNiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjEwOSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiIxMDAiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJCYXNpYyIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGFuZ3VhZ2UiOiJlbi1nYiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IjIwOTktMTItMzEiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXBzdGFydCI6IjIwMTktMDctMTIiLCJpc3MiOiJodHRwczovL2F1dGhzZXJ2aWNlLnByaWFpZC5jaCIsImF1ZCI6Imh0dHBzOi8vaGVhbHRoc2VydmljZS5wcmlhaWQuY2giLCJleHAiOjE1NjMyMjEzOTcsIm5iZiI6MTU2MzIxNDE5N30.lcQU8QBuSWP3MShNwax8y7YRRKbOS8WlR0_ALVsEOj4&format=json&language=en-gb';



$(document).ready(function () {
        console.log("HELLO")

        // Below is the AJAX equation
        $.ajax({
            url: resource_url,
            method: "GET"

            // This function is sequential to AJAX and falls inside the original button click, as does everything below. 
        }).then(function (response) {

            // This logs the response from the API, which, when working, should show a lengthy Array of Objects within Objects. 
            console.log(response);

            // We are assigning the variable SymptomResults to what is pulled from the Array
            var symptomResults = {
                "Description": "Flu, also known as influenza, is a viral infection of the nose, sinuses, throat, and respiratory tract.  It’s seasonal, often occurring in winter, and can spread rapidly, called then flu epidemic.",
                "DescriptionShort": "Flu (often referred as influenza), is a viral infection of the nose, sinuses, throat, and respiratory tract by an influenza or parainfluenza virus.  Swine flu and bird (avian) flu are specific strains of flu.",
                "MedicalCondition": "When the infection occurs in healthy young people, it is usually not dangerous and lasts around one or two weeks.  In some cases a dry cough may develop and last a bit longer.  Elderly and those with pre-existing illnesses have a higher risk for complications.  For this reason it’s recommended that these groups get vaccinated.  Swine and bird flus are caused by slight different influenza viruses, but causing similar symptoms.  Flu typically develops rapidly, with fever (sometimes accompanied with chills), muscle pain, headache, a dry and painful cough,  sore throat, and exhaustion or fatigue.  It’s important to note that the flu is different from the common cold, which is often also caused by a virus, but causes milder symptoms.",
                "Name": "Flu",
                "PossibleSymptoms": "Reduced appetite,Shortness of breath,Eye redness,Sputum,Burning in the throat,Chest pain,Fever,Pain in the limbs,Sore throat,Cough,Headache,Swollen glands on the neck,Swollen glands in the armpits,Tiredness,Runny nose,Sneezing,Chills,Sweating,Stuffy nose",
                "ProfName": "Influenza",
                "Synonyms": null,
                "TreatmentDescription": "Even today flu can have fatal consequences for those with pre-existing conditions and requires a hospital stay with emergency medical measures.  Normally it is self-limited and the body recovers by itself.  A doctor may prescribe medication to help shorten the course of the flu if taken early.  Bed rest and staying hydrated are usually sufficient.  Medications such as Ibuprofen or Aspirin can lower a fever and relieve symptoms, but they will not shorten the course of the illness and should be used in children with caution.  Flu vaccine is recommended for the following groups at risk:  nursing infants, people over 60, people with compromised immune systems, and pregnant women."
            };


            // After click, the below information is added as a child to a new list item

            var newRow = $("<tr>");

            var symptomName = $("<td>");
            symptomName.text(symptomResults.name);

            var symptomDetails = $("<td>");
            symptomDetails.text(symptomResults.possiblesymptoms);

            newRow.append(symptomName, symptomDetails);
            $("tbody").append(newRow);




        });
    
})