//city names to be stored and not overwritten in local storage
const cityFromLocalStorage = JSON.parse(localStorage.getItem('cityName')) || [];

//city names to be called from localstorage on pageload and displayed as buttons
function saveCity(city) {
    cityFromLocalStorage.push(city)
    localStorage.setItem('cityName', JSON.stringify(cityFromLocalStorage))
}

//when city buttons are clicked display brewery info from API(cynthia's function)