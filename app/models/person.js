import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  name: DS.attr('string'),
  height: DS.attr('number'),
  mass: DS.attr('number'),
  eye_color: DS.attr('string'),
  birth_year: DS.attr('string'),
  gender: DS.attr('string'),
});

/*

HTTP/1.0 200 OK
Content-Type: application/json
{
    "birth_year": "19 BBY",
    "eye_color": "Blue",
    "films": [
        "https://swapi.co/api/films/1/",
        ...
    ],
    "gender": "Male",
    "hair_color": "Blond",
    "height": "172",
    "homeworld": "https://swapi.co/api/planets/1/",
    "mass": "77",
    "name": "Luke Skywalker",
    "skin_color": "Fair",
    "created": "2014-12-09T13:50:51.644000Z",
    "edited": "2014-12-10T13:52:43.172000Z",
    "species": [
        "https://swapi.co/api/species/1/"
    ],
    "starships": [
        "https://swapi.co/api/starships/12/",
        ...
    ],
    "url": "https://swapi.co/api/people/1/",
    "vehicles": [
        "https://swapi.co/api/vehicles/14/"
        ...
    ]
}


*/
