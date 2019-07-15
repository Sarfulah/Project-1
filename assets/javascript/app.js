// This code depends on jQuery Core and Handlebars.js 

var api_key = '75af75fd2576efd96771da53a030500a'; // Get your API key at developer.betterdoctor.com

var resource_url = 'https://api.betterdoctor.com/2016-03-01/doctors?location=37.773,-122.413,100&skip=2&limit=10&user_key=' + api_key;



$(document).ready(function () {

    $(document).on("click", "button", function (event) {
        event.preventDefault();

        // Below is the AJAX equation
        $.ajax({
            url: queryURL,
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

        var newRow = $("<ul>");
        
        var symptomName = $("<li>");
        symptomResults.name.text();

        var symptomDetails = $("<li>");
        symptomResults.possiblesymptoms.text();
           
     
            }
     
    });
})
