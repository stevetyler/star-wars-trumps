import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  name: DS.attr('string'),
  cargo_capacity: DS.attr('number'),
  cost_in_credits: DS.attr('number'),
  crew: DS.attr('number'),
  length: DS.attr('number'),
  passengers: DS.attr('number'),
  hyperdrive_rating: DS.attr('string')
});


/*
HTTP/1.0 200 OK
Content-Type: application/json
{
    "MGLT": "10 MGLT",
    "cargo_capacity": "1000000000000",
    "consumables": "3 years",
    "cost_in_credits": "1000000000000",
    "created": "2014-12-10T16:36:50.509000Z",
    "crew": "342953",
    "edited": "2014-12-10T16:36:50.509000Z",
    "hyperdrive_rating": "4.0",
    "length": "120000",
    "manufacturer": "Imperial Department of Military Research, Sienar Fleet Systems",
    "max_atmosphering_speed": "n/a",
    "model": "DS-1 Orbital Battle Station",
    "name": "Death Star",
    "passengers": "843342",
    "films": [
        "https://swapi.co/api/films/1/"
    ],
    "pilots": [],
    "starship_class": "Deep Space Mobile Battlestation",
    "url": "https://swapi.co/api/starships/9/"
}


*/
