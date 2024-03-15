const AllPOKEMONS_API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
let currentPokemon;
let allPokemon = [];
let allPokemonStats = [];
let startCount = 1;
let endCount = 12;

async function loadPokemon() {
    for (let i = startCount; i <= endCount; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        
        allPokemon.push(currentPokemon);
        renderPokemonCard(i);
    }
    console.log('Loaded Pokemon: ', currentPokemon);
}

function renderPokemonCard(indexPokemon) {
    document.getElementById('pokedex').innerHTML += `
        <div id="pokeCard" onclick="openPokemonInfo()">
            <div class="pokeCardTop">
                <h2 id="pokemonName">${currentPokemon['name']}</h2>
                <div id="number">#${indexPokemon}</div>
            </div>
            
            <div class="pokemonType">
                <div id="pokemonTypes_${indexPokemon}" class="pokemonTypes">
                    ${getTypesHTML()}
                </div>
            </div>
            
            <img src="${currentPokemon['sprites']['other']['home']['front_default']}" alt="pokemonImage" id="pokemonImage" class="smallPokemonImage">
            
            <div class="pokeCardBottom">
            
            </div>
        </div>
    `;
}

function getTypesHTML() {
    let htmlText = "";
    for (let indexOfPokemonType = 0; indexOfPokemonType < currentPokemon['types'].length; indexOfPokemonType++) {
        htmlText +=` <p>${currentPokemon['types'][indexOfPokemonType]['type']['name']}</p> `;
        console.log('Kommt an');
    }
    return htmlText;
}

function openPokemonInfo() {
    document.getElementById('pokemonInfoName').innerHTML += currentPokemon['name'];
    document.getElementById('pokemonInfoImage').src = currentPokemon['sprites']['other']['home']['front_default'];
}

function nextPokemon() {

}

function previousPokemon() {

}

function init() {
    loadPokemon();
    renderStats();
}