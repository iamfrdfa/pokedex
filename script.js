const AllPOKEMONS_API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
let currentPokemon;
let allPokemon = [];
let allPokemonTypes = [];
let startCount = 1;
let endCount = 10;

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
        <div id="pokeCard_${indexPokemon}" class="pokeCard" onclick="openPokemonOverlay(${indexPokemon})">
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
        allPokemonTypes.push(currentPokemon['types']);
        //console.log('Dein Typ: ', currentPokemon['types'][indexOfPokemonType]['type']['name']);
    }
    return htmlText;
}

function openPokemonOverlay(indexOfPokemon) {
    document.getElementById('pokemonInfoOverlay').classList.remove('d-none');
    document.getElementById('pokemonInfoOverlay').innerHTML += `
        <div id="bigPokeCard_${indexOfPokemon}" class="bigPokeCard">
            <div class="bigPokeCardTop">
                <h2 id="pokemonInfoName">${allPokemon[indexOfPokemon - 1]["name"]}</h2>
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
            
            <img src="${allPokemon[indexOfPokemon - 1]['sprites']['other']['home']['front_default']}" alt="pokemonImage" id="pokemonInfoImage" class="bigPokemonImage">
            
            <div class="bigPokeCardBottom">
                <div id="aboutHeader">
                    <img src="./img/left.png" alt="previousPokemon" class="arrowButton" onclick="previousPokemon(${indexOfPokemon})">
                    <h3>About</h3>
                    <img src="./img/right.png" alt="nextPokemon" class="arrowButton" onclick="nextPokemon(${indexOfPokemon})">
                </div>
                <div id="aboutWrapper">
                    <div class="left">
                        <div>Height:</div>
                        <div>Weight:</div>
                        <div>Abilities:</div>
                    </div>
                    
                    <div id="abilities-id" class="right">
                        <div>${allPokemon[indexOfPokemon-1]['height']}"</div>
                        <div>${allPokemon[indexOfPokemon-1]['weight']}</div>
                        <div>${allPokemon[indexOfPokemon-1]['abilities']['0']['ability']['name']}</div>
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
    document.getElementById('pokemonInfoOverlay').innerHTML = ``;
    document.getElementById('pokemonInfoOverlay').classList.add('d-none');
}

function nextPokemon(indexOfPokemon) {
    if (indexOfPokemon < 1025) {
        indexOfPokemon++;
        document.getElementById('pokemonInfoOverlay').innerHTML = ``;
        openPokemonOverlay(indexOfPokemon);
    }
}

function previousPokemon(indexOfPokemon) {
    if (indexOfPokemon >= 1) {
        indexOfPokemon--;
        document.getElementById('pokemonInfoOverlay').innerHTML = ``;
        openPokemonOverlay(indexOfPokemon);
    }
}

function init() {
    loadPokemon();
    renderStats();
}

//Funktion um mit bestimmten Tasten im Overlay zu agieren
document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
        closePokemonOverlay();
    }
    else if (evt.key === 'ArrowRight') {
        nextPokemon(currentPokemon + 1);
    }
    else if (evt.key === 'ArrowLeft') {
        previousPokemon(currentPokemon - 1);
    }
});