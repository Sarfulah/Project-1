let grabZipCodeList = (zipCode = "19428") => {
    let api_key = 'HsVZponJhiYg4vLcjDCPk9Z4REbd09u3nuirubz09YROay3pojqgxtt79OSTllbP'
    let zipCode_URL = 'https://www.zipcodeapi.com/rest/' + api_key + '/info.json/19428/degrees'

    getData(zipCode_URL + api_key, 'GET', structureZipCodeData);
};

function structureZipCodeData(data){
    currentSession.userLon = data.lng;
    currentSession.userLat = data.lat;
    betterDoctorSearch()
    console.log(currentSession)
}





$("#zipInput").on("click", function(){
    let userZip = $("#zipInput").val()
    grabZipCodeList(userZip);

})

let sampleReturn = {
    "zip_code": "19438",
    "lat": 40.268907,
    "lng": -75.390931,
    "city": "Harleysville",
    "state": "PA",
    "timezone": {
        "timezone_identifier": "America/New_York",
        "timezone_abbr": "EDT",
        "utc_offset_sec": -14400,
        "is_dst": "T"
    },
    "acceptable_city_names": [
        {
            "city": "Lower Salford",
            "state": "PA"
        }
    ]
 }

 structureZipCodeData(sampleReturn)

 