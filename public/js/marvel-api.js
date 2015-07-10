var $ = window.jQuery

class MarvelApi{
	constructor(){
		this.baseUrl = "http://pokeapi.co/"
		this.url = this.baseUrl+"api/v1/pokedex/1/"
	}
	findPokemons(){
		 
			return Promise.resolve($.get(this.url))
		 
		
	}
}

window.MarvelApi = MarvelApi