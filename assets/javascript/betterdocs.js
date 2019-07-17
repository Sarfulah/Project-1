
var api_key = 'CODE_SAMPLES_KEY_9d3608187'; // Get your API key at developer.betterdoctor.com

var resource_url = 'https://api.betterdoctor.com/2016-03-01/doctors?location=39.941536%2C-75.199129%2C100&user_location=39.941536%2C-75.199129&skip=0&limit=10&user_key=61f66e9cb52287821fcea95e444242f6'

var pulledData;

$.ajax({
    url: "https://api.betterdoctor.com/2016-03-01/doctors?location=39.941536%2C-75.199129%2C100&user_location=39.941536%2C-75.199129&skip=0&limit=10&user_key=61f66e9cb52287821fcea95e444242f6",
    method: "GET"
}).then(function (response) {
    console.log(response);
    var newData = response.data;
    pulledData = newData;
    for (var i = 0; i < newData.length; i++) {
        console.log(i)

        // Doctor Name Variables Declared and Data Pulled from API
        var firstName = newData[i].profile.first_name;
        var lastName = newData[i].profile.last_name;

        // Insurance Provider Array Defined and Data Pulled from APR
        var insuranceProvider = []
        newData[i].insurances.forEach(element => {
            insuranceProvider.push(" " + element.insurance_provider.name)
        });
        var insuranceProviderUpdated = [...new Set(insuranceProvider)]

        // Doctor Address Array Defined and Data Pulled for City + State, then Merged into one field
        var doctorAddress = []
        newData[i].practices.forEach(element => {
            if (element.visit_address.zip !== undefined) {
                doctorAddress.push(" " + element.visit_address.city + ", " + element.visit_address.state + " " + element.visit_address.zip);
            } else {

                doctorAddress.push(" " + element.visit_address.city + ", " + element.visit_address.state);
            }
        });
        var doctorAddressUpdated = [...new Set(doctorAddress)]


        // License Details pulled and combined
        var licenseSpecs = []
        newData[i].licenses.forEach(element => {
            licenseSpecs.push(" " + element.number + "-" + element.state)
        });
        var licenseSpecsUpdated = [...new Set(licenseSpecs)]

        // Specialty variable defined as Array and data pulled
        var mdSpeciality = []
        newData[i].specialties.forEach(element => {
            mdSpeciality.push(" " + element.name)
        });
        var mdSpecialtyUpdated = [...new Set(mdSpeciality)]

        // Rating variable defined and data pulled
        var mdRating = []
        newData[i].ratings.forEach(element => {
            mdRating.push(" " + element.rating)
        });
        var mdRatingUpdated = [...new Set(mdRating)]

        // New Variables for List defined and set to Input Variables  
        var newList = $("<ul>");
        var doctorNameli = $("<li>").text("Name: " + firstName + " " + lastName);
        var insuranceProviderli = $("<li>").text("Health Plans: " + " " + insuranceProviderUpdated);
        var doctorAddressli = $("<li>").text("Locations: " + " " + doctorAddressUpdated);
        var licenseSpecsli = $("<li>").text("License: " + " " + licenseSpecsUpdated);
        var mdSpecialtyli = $("<li>").text("Specialties: " + " " + mdSpecialtyUpdated);


        // This removes Empty Rating Variables
        var mdSpecialtyli;
        if (newData[i].specialties.length > 0) {
            mdSpecialtyli = $("<li>").text("Specialty : " + " " + mdSpecialtyUpdated);
        }
        else {
            mdSpecialtyli = "";
        }

        var mdRatingli;
        if (newData[i].ratings.length > 0) {
            mdRatingli = $("<li>").text("Rating : " + " " + mdRatingUpdated);
        }
        else {
            mdRatingli = "";
        }

        var licenseSpecsli;
        if (newData[i].licenses.length > 0) {
            licenseSpecsli = $("<li>").text("License : " + " " + licenseSpecsUpdated);
        }
        else {
            licenseSpecsli = "";
        }


        newList.append(doctorNameli, insuranceProviderli, doctorAddressli, licenseSpecsli, mdSpecialtyli, mdRatingli);
        $(".results").append(newList);
    }
});
