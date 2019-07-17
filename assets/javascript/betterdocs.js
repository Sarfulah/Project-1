
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


        var firstName = newData[i].profile.first_name;
        var lastName = newData[i].profile.last_name;
        var insuranceProvider = []
        newData[i].insurances.forEach(element => {
            insuranceProvider.push(" " + element.insurance_provider.name)
        });
        var insuranceProviderUpdated = [...new Set(insuranceProvider)]

        var licenseNumber = []
        newData[i].licenses.forEach(element => {
            licenseNumber.push(" " + element.license.number)
        });




        var doctorAddress = []
        newData[i].practices.forEach(element => {
            doctorAddress.push(" " + element.visit_address.city + "-" + element.visit_address.state)
        });
        // console.log(insuranceName);
        var doctorAddressUpdated = [...new Set(doctorAddress)]
       

    
    var newList = $("<ul>");
    // Should send to browser
    var doctorNameli = $("<li>").text("Name: " + firstName + " " + lastName);

    // Should send to browser with ALL items
    var insuranceProviderli = $("<li>").text("Health Plans: " + " " + insuranceProviderUpdated);
    // console.log(insuranceNameli);

       // Should send to browser with ALL items
       var doctorAddressli = $("<li>").text("Locations: " + " " + doctorAddressUpdated);
       // console.log(insuranceNameli);

    // Should send to Browser with ALL items
    // var doctorAddressli = $("<li>").text(doctorCity + ", " + doctorState);

    

    newList.append(doctorNameli, insuranceProviderli, doctorAddressli);
    $(".results").append(newList);
}
});
