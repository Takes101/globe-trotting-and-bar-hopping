//city names to be stored and not overwritten in local storage
const cityFromLocalStorage = JSON.parse(localStorage.getItem('cityName')) || [];

//city names to be displayed as buttons
$("#brewerySearch").click(function () {

    let searchCity = $('.dropBtn').val();
    let cityDiv = $('<BUTTON>').append(searchCity)
    $('#cityName').append(cityDiv);

    //console.log('yes', searchCity)
    //persist the data after refresh

    localStorage.setItem('cityName', searchCity);
    saveCity(searchCity)

});

//city buttons to be called from localstorage and persist after page refresh
function saveCity(searchCity) {
    cityFromLocalStorage.push(searchCity)
    localStorage.setItem('cityName', JSON.stringify(cityFromLocalStorage))

    console.log(cityFromLocalStorage)

    $(document).on('load', function(){
        for (let i = 0; i < cityFromLocalStorage.length; i++) {
            let cityBtn = $('<BUTTON>').append(cityFromLocalStorage[i])
            $('#cityName').append(cityBtn);  
        }
        
    })
    //
}

//saveCity(searchCity)

// function 
// renderButton()
//when city buttons are clicked display brewery info from API(cynthia's function)