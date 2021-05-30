var storedBrewery = JSON.parse(localStorage.getItem('brewery')) || [];


$("#brewerySearch").click(function () {

    let searchCity = $('.dropBtn').val();
    let searchState = $('.select').find(":selected").val();

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
                console.log('success ', response);
                for (let i = 0; i < response.length; i++) {
                    console.log(response[i]);
                    let cityDiv = $('<BUTTON>').append(response[i].name)
                    $('#cityName').append(cityDiv);
                    
                    storedBrewery.push(response[i].name);
                    localStorage.setItem('brewery', JSON.stringify(storedBrewery));
                }
            }
        })
});

$('#clear').on('click', function() {
    localStorage.clear();
    location.reload()
})


// Random Beer Generator

// onclick function for button
$('#random-beer').on('click', function() {
    //ajax code here with random api (No Params needed)
    $.ajax({
        url: 'https://api.punkapi.com/v2/beers/random',
        method: 'GET'
    })
        // simple console.log to ensure response is returned in Console
       .then(function(response) {
            console.log(response);

        })
});
    


    
   


