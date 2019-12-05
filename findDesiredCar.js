/**
 * Panek car finder.
 * Użycie: Wklej kod do przeglądarki (F12 -> console);
 * Wpisz: findCar('nazwa samochodu')
 */

var carMap = {};
var panekResponse = {};

$.post('https://panel.panekcs.pl/Home/GetLocations',{}, function(response) {
    panekResponse = response;
    carMap = createCarMap(response.Vehicles.Category);
    printAvailableCars(carMap);
    console.log('Panek car finder ready!!');
    findCar('POLONEZ');
});

function findCar(carName){
    console.log('CAR Name: ' + carName);
    if(!carMap[carName]){
        console.log('Samochód niedostępny');
        return;
    }
    $(carMap[carName]).each(function(i, item){
        console.log('Nr rejestracyjny: ' + panekResponse.Vehicles.RegistrationNumber[i]);
        console.log('Koordynaty: ');
        console.log(panekResponse.Vehicles.Coordinates[i])
    });
}

function createCarMap(availableCars){
    var carMap = {};

    $(availableCars).each(function(i, item){
        if(!carMap[item]){
            carMap[item] = [];
        }
        carMap[item].push(i);
    });
    return carMap;
}

function printAvailableCars(carMap){
    console.log('Dostępne auta:');
    $(Object.keys(carMap)).each(function(i, item){
        console.log(item);
    });
}