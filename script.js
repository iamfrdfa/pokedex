const AllPOKEMONS_API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
let currentPokemon;
let allPokemon = [];
let allPokemonStats = [];
let startCount = 1;
let endCount = 8;

async function loadPokemon() {
    for (let index = startCount; index <= endCount; index++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${index}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        
        allPokemon.push(currentPokemon);
        renderPokemonCard(index);
    }
    console.log('Loaded Pokemon: ', currentPokemon);
}

function renderPokemonCard(indexPokemon) {
    document.getElementById('pokedex').innerHTML += `
        <div id="pokeCard" onclick="openPokemonOverlay(${indexPokemon})">
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
        allPokemonStats.push(currentPokemon['types']);
    }
    return htmlText;
}

function openPokemonOverlay(indexOfPokemon) {
    document.getElementById('pokemonInfoOverlay').classList.remove('d-none');
    document.getElementById('pokemonInfoOverlay').innerHTML += `
        <div id="bigPokeCard">
            <div class="bigPokeCardTop">
                <h2 id="pokemonInfoName">${currentPokemon['name']}</h2>
                <div id="pokemonNumber">#${indexOfPokemon}</div>
                <div id="closeOverlay" onclick="closePokemonOverlay()">
                    <img src="./img/close.png" alt="close" class="close-btn">
                </div>
            </div>
            
            <div class="pokemonType">
                <div>
                    ${getTypesHTML()}
                </div>
            </div>
            
            <img src="${currentPokemon['sprites']['other']['home']['front_default']}" alt="pokemonImage" id="pokemonInfoImage" class="bigPokemonImage">
            
            <div class="bigPokeCardBottom">
                <div id="aboutHeader">
                    <img src="./img/left.png" alt="previousPokemon" class="arrowButton" onclick="previousPokemon()">
                    <h3>About</h3>
                    <img src="./img/right.png" alt="nextPokemon" class="arrowButton" onclick="nextPokemon()">
                </div>
                <div id="aboutWrapper">
                    <div class="left">
                        <div>Height</div>
                        <div>Weight</div>
                        <div>Abilities</div>
                    </div>
                    
                    <div id="abilities-id" class="right">
                        <div>Height</div>
                        <div>Weight</div>
                        <div>Abilities</div>
                    </div>
                </div>
                
                <div id="stats">
                    <h3>Basic Statistics</h3>
                    <canvas id="myChart"></canvas>
                </div>
            </div>
        </div>
    `;
}

function closePokemonOverlay() {
    document.getElementById('pokemonInfoOverlay').classList.add('d-none');
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