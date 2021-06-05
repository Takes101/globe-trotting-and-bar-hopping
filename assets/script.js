var storedBrewery = JSON.parse(localStorage.getItem('brewery')) || [];
var storedCity = JSON.parse(localStorage.getItem('city')) || [];

if(storedCity.length > 0){
    storedCity.forEach(city => {
        console.log(city)
        let cityDiv = $('<BUTTON>').append(city.city + " " + city.state)
        cityDiv.click(function () {
            getAPIData(city.city, city.state)
        });
     $('#cityName').append(cityDiv);
    });
}

function getAPIData (searchCity, searchState) {

    if (searchCity === '') {
        $('#inputError').text('Please insert at least one city')
        return;
    }


    $.ajax({
        url: "https://api.openbrewerydb.org/breweries?by_city=" + searchCity + "&by_state=" + searchState,
        method: 'GET'
    })
        .then(function (response) {
            if (response == '') {
                $('#inputError').text('Please insert the right city name or state')
            } else {
                $("#search-results").empty()
                for (let i = 0; i < response.length; i++) {
                    console.log("res", response[i]);
                    var cityName = response[i].name;
                    var cityWebSite = response[i].website_url;
                    // displayCities(storedBrewery.length);
                    // updateBreweries(cityName, cityWebSite);
                    // createCitiesArray(storedBrewery.length);
                    //     console.log('success ', response[i]);
                    //     //Cody updated from button to li element here
                    //let cityDiv = $('<li>').text(cityName)
                    //$('#breweryName').append(cityDiv);
                    
                    // brewery object to return name and url jl
                    var breweryData = {
                        name: response[i].name,
                        url: response[i].website_url
                    }

                    storedBrewery.push(breweryData);
                    localStorage.setItem('brewery', JSON.stringify(storedBrewery));
                    //creating a href for web url
                    var breweryUrl = $('<a>')
                    breweryUrl.attr('href', response[i].website_url)
                    breweryUrl.attr('target', '_blank')
                    //Cody updated from button to li element here
                    let cityDiv = $('<li>').append(response[i].name)
                    breweryUrl.append(cityDiv)
                    $('#search-results').append(breweryUrl);

                    //creating extra values in index = null
                    // storedBrewery.push(response[i].name, response[i].website_url);
                    // localStorage.setItem('brewery', JSON.stringify(storedBrewery));
                }
                let cityDiv = $('<BUTTON>').append(searchCity + " " + searchState)
                $('#cityName').append(cityDiv);
            }
        })

        //city and state object
        var cityState = {
            city: searchCity,
            state: searchState
        }

        // before you push the cityState to storedCity, try to loop through storedCity first
        // and check if the city and state already exists

        //updated to display city and state in button
        storedCity.push(cityState)
        localStorage.setItem('city', JSON.stringify(storedCity))
}

$("#brewerySearch").click(function() {
    let searchCity = $('.dropBtn').val();
    let searchState = $('.select').find(":selected").val();

    getAPIData(searchCity, searchState)
});

$('#clear').on('click', function () {
    localStorage.clear();
    location.reload()

})

// Random Beer Generator

// onclick function for button
var randomBeer = JSON.parse(localStorage.getItem('beer')) || [];

$('#random-beer').on('click', function () {

    //ajax code here with random beer api (No Params needed)
    $(function () {
        $.ajax({
            url: 'https://api.punkapi.com/v2/beers/random',
            method: 'GET'
        })
            .then(function (response) {

                let beerNameDiv = $('#beer-name').text('')
                let beerDescriptionDiv = $('#beer-description').text('')
                let beerTaglineDiv = $('#beer-tagline').text('')
                let beerAbvDiv = $('#beer-abv').text('')

                console.log(response);
                beerNameDiv = $('#beer-name').text('Order This: ').append(response[0].name);
                beerDescriptionDiv = $('#beer-description').text('Description: ').append(response[0].description)
                beerTaglineDiv = $('#beer-tagline').text('This beer is a ').append(response[0].tagline)
                beerAbvDiv = $('#beer-abv').text('ABV: ').append(response[0].abv)
                $('newBeer').append(beerNameDiv, beerDescriptionDiv, beerAbvDiv, beerTaglineDiv);

                randomBeer.push(response[0].name, response[0].description)
                localStorage.setItem('beer', JSON.stringify(randomBeer))
            })
    });
});







