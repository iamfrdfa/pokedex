const AllPOKEMONS_API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
let currentPokemon;
let allPokemon = [];
let startCount = 1;
let endCount = 2;

async function loadPokemon() {
    for (let i = startCount; i <= endCount; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        
        allPokemon.push(currentPokemon);
        renderPokemonCard(i);
    }
    openPokemonInfo();
    console.log('Loaded Pokemon: ', currentPokemon);
    console.log('Pokemon Type 1: ', currentPokemon['types']['0']['type']['name']);
    console.log('Pokemon Type 2: ', currentPokemon['types']['1']['type']['name']);
}

function renderPokemonCard(i) {
    document.getElementById('pokedex').innerHTML += `
        <div id="pokeCard" onclick="openPokemonInfo">
            <div class="pokeCardTop">
                <h2 id="pokemonName">${currentPokemon['name']}</h2>
                <div id="number">#${i}</div>
            </div>
            
            <div class="pokemonType">
                <div>
                    <p id="pokemonFirstCategory">${currentPokemon['types']['0']['type']['name']}</p>
                </div>
                <div>
                    <p id="pokemonSecondCategory"></p>
                </div>
            </div>
            
            <img src="${currentPokemon['sprites']['other']['home']['front_default']}" alt="pokemonImage" id="pokemonImage" class="smallPokemonImage">
            
            <div class="pokeCardBottom">
            
            </div>
        </div>
    `;
}

function openPokemonInfo() {
    document.getElementById('pokemonInfoName').innerHTML += currentPokemon['name'];
    document.getElementById('pokemonInfoImage').src = currentPokemon['sprites']['other']['home']['front_default'];
    console.log(currentPokemon['sprites']['other']['home']['front_default']);
}

function init() {
    loadPokemon();
    renderStats();
}