// create fetch for the Punk API

//function for when button is cliocked
function myFunction() {

// or do I use var apiUrl?
var apiUrl = 'https://api.punkapi.com/v2/beers/random'


// fectch
fetch (

    'https://api.punkapi.com/v2/beers/random'

)
    .then(function(response) {
        return response.json();
    })

    });
}

console.log

// document.querySelector
// appendChild element
// 