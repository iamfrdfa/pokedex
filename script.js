const AllPOKEMONS_API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
const POKEMON_NAME = [];
let currentPokemon;
let start = 0;

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/bulbasaur';
    let response = await fetch(url);
    currentPokemon = await response.json();
    
    console.log('Loaded Pokemon: ', currentPokemon);
    
    renderPokemonInfo();
}

function renderPokemonInfo() {
    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    document.getElementById('pokemonImage').src = currentPokemon['sprites']['other']['home']['front_default'];
}

function openPokemonInfo() {

}

function init() {
    loadPokemon();
}