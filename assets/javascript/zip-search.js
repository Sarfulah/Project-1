let grabZipCodeList = (zipCode = "19428") => {
    let api_key = "js-ZSReG2aPYYVK0G2uwxKPH27XhlDX3ZLFoxAyBV8c8YCALDA7SlIaVBzsShimBeS5"
    let zipCode_URL = 'https://www.zipcodeapi.com/rest/' + api_key + '/info.json/19428/degrees'

    getData(zipCode_URL + api_key, 'GET', structureZipCodeData);
    //structureZipCodeData(sampleReturn)
};

function structureZipCodeData(data){
    currentSession.userLon = data.lng;
    currentSession.userLat = data.lat;
    grabDoctorData()
    console.log(currentSession)
}


let setupZipSearch = () => {
    $(".findBTN").on("click", function(){
        let userZip = $("#userZip").val()
        console.log(userZip)
        grabZipCodeList(userZip);
    });
}




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

 //structureZipCodeData(sampleReturn)

 