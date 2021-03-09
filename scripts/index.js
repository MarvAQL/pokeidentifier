var sprite = 'front_default';
var clicked;

const fetchPokemon = () => {

    let id = document.getElementById("pokemonId").value;
    if (!isValidPokemonId(id)){
        alert("invalid Pokemon ID!");
        return;
    }
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`; // get the api(poke api)

    fetch(url).then( //take the data from the api then do something 
        (result) =>{ 
            return result.json();//returns a file that has the index etc
        }
    ).then(
        (data) =>{         
            console.log(data);   
            const pokemon = {//gets the pokemons relevant details
                id: data.id,
                name: data.name,
                image: data.sprites[sprite],
                type: data.types.map(
                    (type) => type.type.name
                ).join(', ')
            }

            console.log(pokemon);
            displayPokemon(pokemon);//displays pokemon to page
  
        }
    )
}


function shinyChance(){
    
    if(clicked == true){
        sprite = 'front_default';
        clicked = false;
    }
    else{
        sprite = 'front_shiny';
        clicked = true;
    }
    
  
    fetchPokemon();

}


const displayPokemon = (pokemon) =>{//the display method 
    
    const pokemonHTMLString = //print the data into html
    `
    <div class="card">
        <img class="card-image" src="${pokemon.image}"/>
        <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
        <p class="card-subtitle">Type: ${pokemon.type}</p>
    </div>
    `;
    const pokemonCard = document.getElementById("pokemonCard");//calls the html id
    pokemonCard.innerHTML = pokemonHTMLString; //makes the html in pokemon card = to the html we wrote here
}
function isValidPokemonId(id) {
    var n = Math.floor(Number(id));
    return n !== Infinity && String(n) === id && n >= 0;
}