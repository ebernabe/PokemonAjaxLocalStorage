var $ = window.jQuery
// var MarvelApi = window.MarvelApi

 if (localStorage.getItem("vcharacters")=== null){

var api = new MarvelApi()
				api.findPokemons()
				.then(function(results){ 
					 
					var characters = results.pokemon
					var promises = []
					 
						for(var i in characters){
							var character =characters[i]
							var characterUrl = api.baseUrl+character.resource_uri
							promises.push(Promise.resolve($.get(characterUrl)))
						}
						return Promise.all(promises)
					 
				})
				.then(function(characters){ 
				    for (var i in characters){
				     	if(characters[i].sprites.length){
				     	 var imgUri = `${api.baseUrl}media/img/${characters[i].pkdx_id}.png`
				     	 characters[i].img = imgUri
				     	}
				     }
				      
				    
				     return characters
				})
				.then(function(characters){

					localStorage.setItem("vcharacters",JSON.stringify(characters))
				crearcards(characters)
				console.log(localStorage.getItem("vcharacters"));
				}) 

				.catch(function(err){
					console.error(err)
				})

 }else{
 	var a = localStorage.getItem("vcharacters")
 	crearcards($.parseJSON(a))
 }


function crearcards(characters){
	for(var i in characters){
		var abilities = ""
		for(var j in characters[i].abilities){
			abilities += characters[i].abilities[j].name+", "
		}
		if(characters[i].img !== undefined){
		$(".Battle-player").append(`<div class="Card undefined">
                  <div class="Card-container">
                    <h2 class="Card-name">${characters[i].name}</h2><img src="${characters[i].img}" alt="${characters[i].name}" class="Card-image">
                    <div class="Card-description">${abilities}</div>
                    <div class="Card-attack">${characters[i].attack} puntos de ataque</div>
                    <div class="Card-attack">${characters[i].defense} puntos de defensa</div>
                  </div>
                  <div class="Card-backface"> </div>
                </div>`)
		}

}
}


//Promise
////estados
//////pending
//////resolved
//////rejected
