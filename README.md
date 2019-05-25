# star-wars-trumps

Star Wars Top Trumps

Using SWAPI: https://swapi.co/documentation

Build an application to select random people or starships and render their details to see who would win based on a common attribute.
i.e. people have mass and starships have crew. A person with greater mass wins, a starship with more crew wins.

The app should render the attributes from the resource in a simple web page that allows you to ‘play’ the game.

Once two cards are displayed the app should declare one of the cards a winner based on the higher common attribute.

Having displayed the winning card, the user should be able to play again using an action button that repeats the same request.

Bonus points! These are not required, just adds to your portfolio in an interview:
1 - Score counter. If there are two players, left and right, show how many times each side has won.
2 - Option to select which resource to play against
3 - Use Bootstrap-4 and display the details in a card https://getbootstrap.com/docs/4.1/components/card  and the winning attribute in badges https://getbootstrap.com/docs/4.1/components/badge


## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)
* [Google Chrome CORS extension](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en)

## Installation

* `git clone <repository-url>` this repository
* `cd star-wars-trumps`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
