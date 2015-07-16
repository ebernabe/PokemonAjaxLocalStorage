var $ = window.jQuery
// var MarvelApi = window.MarvelApi


function cardAppend(character,abilities){
	$(".Battle-player").append(`<div class="Card undefined">
                  <div class="Card-container">
                    <h2 class="Card-name">${character.name}</h2><img src="${character.img}" alt="${character.name}" class="Card-image">
                    <div class="Card-description">${abilities}</div>
                    <div class="Card-attack">${character.attack} puntos de ataque</div>
                    <div class="Card-attack">${character.defense} puntos de defensa</div>
                  </div>
                  <div class="Card-backface"> </div>
                </div>`)
}

function crearcards(characters){
	for(var i in characters){
		var abilities = ""
		for(var j in characters[i].abilities){
			abilities += characters[i].abilities[j].name+", "
		}
		if(characters[i].img !== undefined){
			cardAppend(characters[i],abilities)
		}

	}
}


function crearcard(character){
		var abilities = ""
		for(var j in character.abilities){
			abilities += character.abilities[j].name+", "
		}
		if(character.img !== undefined){
			cardAppend(character,abilities)
		}


}


$(document).ready(function(){
			if (localStorage.getItem("vcharacters")=== null){

			var api = new MarvelApi()
							api.findPokemons()
							.then(function(results){ 
								 
								var characters = results.pokemon
								var promises = []
								 
									for(var i in characters){
										var character =characters[i]
										var characterUrl = api.baseUrl+character.resource_uri
										promises.push(Promise.resolve($.get(characterUrl).done(function(res){
												console.log(res)

											     	if(res.sprites.length){
											     	 var imgUri = `${api.baseUrl}media/img/${res.pkdx_id}.png`
											     	 res.img = imgUri
											     	 crearcard(res)
											     	}
											     
												return res
										})))
									}
									return Promise.all(promises)
								 
							})
							.then(function(characters){
										localStorage.setItem("vcharacters",JSON.stringify(characters))
						 				console.log(localStorage.getItem("vcharacters"));
							}) 
							.catch(function(err){
								console.error(err)
							})

			 }else{
			 	var a = localStorage.getItem("vcharacters")
			 	crearcards($.parseJSON(a))
			 }
});


//Promise
////estados
//////pending
//////resolved
//////rejected
