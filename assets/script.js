//fetch brewery data using example city
fetch(
    'https://api.openbrewerydb.org/breweries?by_city=san_diego'
)
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        var responseContainerEl = document.querySelector('.placeholder');
        // Create an '<li>' element
        var breweryInfo = document.createElement('li');
        // Append that element's 'response from the URL to the 'li' element
        breweryInfo.append(response[0].name);
        
        //repeat for each of the 5 breweries
        var breweryInfo2 = document.createElement('li');
        breweryInfo2.append(response[1].name);

        var breweryInfo3 = document.createElement('li');
        breweryInfo3.append(response[2].name);

        var breweryInfo4 = document.createElement('li');
        breweryInfo4.append(response[3].name);

        var breweryInfo5 = document.createElement('li');
        breweryInfo5.append(response[4].name);
        // Append the '<p>' element to the page for each brewery, display brewery data on page
        responseContainerEl.appendChild(breweryInfo);
        responseContainerEl.appendChild(breweryInfo2);
        responseContainerEl.appendChild(breweryInfo3);
        responseContainerEl.appendChild(breweryInfo4);
        responseContainerEl.appendChild(breweryInfo5);
        console.log(response);
    });






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
