let allPokemon = [];
let allPokemonTypes = [];
let allPokemonNames = [];
let startCount = 0;
let endCount = 29;
let loadMoreCounter = 30;
let allPokemonStatsValue = [];
let currentPokemon;
async function init() {
    await loadPokemon();
    endLoading();
}

async function loadPokemon(index) {
    for (let index = startCount; index <= endCount; index++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${index + 1}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        
        allPokemon.push(currentPokemon);
        allPokemonNames.push(currentPokemon['name']);
        allPokemonStatsValue.push(currentPokemon['stats']);
        
        renderPokemonCard(index);
    }
}

function renderPokemonCard(indexPokemon) {
    document.getElementById('pokedex').innerHTML += `
        <div id="pokeCard_${indexPokemon}" class="pokeCard ${allPokemon[indexPokemon]['types'][0]['type']['name']}" onclick="openPokemonOverlay(${indexPokemon})">
            <div class="pokeCardTop">
                <h2 id="pokemonName">${allPokemon[indexPokemon]['name']}</h2>
                <div id="number">#${allPokemon[indexPokemon]['id']}</div>
            </div>
            
            <div class="pokemonType">
                <div id="pokemonTypes_${indexPokemon}" class="pokemonTypes">
                    ${getTypesHTML(indexPokemon)}
                </div>
            </div>
            
            <img src="${allPokemon[indexPokemon]['sprites']['other']['home']['front_default']}" alt="pokemonImage" id="pokemonImage" class="smallPokemonImage">
            
            <div class="pokeCardBottom">
            
            </div>
        </div>
    `;
}

function openPokemonOverlay(indexOfPokemon) {
    document.body.style.overflowY = 'hidden';
    document.getElementById('pokemonInfoOverlay').classList.remove('d-none');
    document.getElementById('pokemonInfoOverlay').innerHTML += `
        <div id="bigPokeCard_${indexOfPokemon}" class="bigPokeCard ${allPokemon[indexOfPokemon]['types'][0]['type']['name']}">
            <div class="bigPokeCardTop">
                <h2 id="pokemonInfoName">${allPokemon[indexOfPokemon]["name"]}</h2>
                <div id="pokemonNumber">#${indexOfPokemon + 1}</div>
                <div id="closeOverlay" onclick="closePokemonOverlay()">
                    <img src="./img/close.png" alt="close" class="close-btn">
                </div>
            </div>
            
            <div class="pokemonType">
                <div class="pokemonTypeOverlay">
                    ${getTypesHTML(indexOfPokemon)}
                </div>
            </div>
            
            <img src="${allPokemon[indexOfPokemon]['sprites']['other']['home']['front_default']}" alt="pokemonImage" id="pokemonInfoImage" class="bigPokemonImage">
            
            <div class="bigPokeCardBottom">
                <div id="aboutHeader">
                    <img src="./img/left.png" alt="previousPokemon" id="arrowLeft_${indexOfPokemon}" class="arrowButtonLeft" onclick="previousPokemon(${indexOfPokemon})">
                    <h3>About</h3>
                    <img src="./img/right.png" alt="nextPokemon" id="rightArrow_${indexOfPokemon}" class="arrowButtonRight" onclick="nextPokemon(${indexOfPokemon})">
                </div>
                <div id="aboutWrapper">
                    <div class="left">
                        <div>Height:</div>
                        <div>Weight:</div>
                        <div>Abilities:</div>
                    </div>
                    
                    <div id="abilities-id" class="right">
                        <div>${allPokemon[indexOfPokemon]['height']}"</div>
                        <div>${allPokemon[indexOfPokemon]['weight']}</div>
                        <div>${allPokemon[indexOfPokemon]['abilities']['0']['ability']['name']}</div>
                    </div>
                </div>
                
                <div id="stats">
                    <h3>Basic Statistics</h3>
                    <canvas id="myChart" style="height: 15vh; width: 30vw;"></canvas>
                </div>
            </div>
        </div>
    `;
    renderStats(indexOfPokemon);
}

function getTypesHTML(pokeIndex) {
    let htmlText = "";
    let detailPokemon = allPokemon[pokeIndex];
    for (let indexOfPokemonType = 0; indexOfPokemonType < detailPokemon['types'].length; indexOfPokemonType++) {
        htmlText +=` <p>${allPokemon[pokeIndex]['types'][indexOfPokemonType]['type']['name']}</p> `;
        allPokemonTypes.push(detailPokemon['types']);
    }
    return htmlText;
}

async function loadMorePokemon() {
    startLoading();
    startCount += loadMoreCounter;
    endCount += loadMoreCounter;
    init();
}

function startLoading() {
    let loadButton = document.getElementById('loadMore');
    loadButton.innerHTML = /*html*/ `<b>Loading more Pokémon...</b>`;
}

function endLoading() {
    let loadButton = document.getElementById('loadMore');
    loadButton.innerHTML = /*html*/ `
        <button onclick="loadMorePokemon()">
            Load More Pokemon
        </button>
    `;
}

//Filterfunktion für die Suche
function filterNames(index = 0) {
    let search = document.getElementById('searchPokemonInput').value;
    search = search.toLowerCase(); //um alles eingegebene in kleine Buchstaben umzuwandeln
    document.getElementById('pokedex').innerHTML = ``;
    
    for (let index = 0; index < allPokemon.length; index++) {
        if (allPokemon[index]['name'].includes(search)) {
            renderPokemonCard(index);
        }
    }
}

function deleteSearch() {
    document.getElementById('searchPokemonInput').value = ``;
    loadPokemon();
}

async function nextPokemon(indexOfPokemon) {
    if (indexOfPokemon < 1025) {
        if (indexOfPokemon === (currentPokemon['id'] - 1)) {
            document.getElementById(`rightArrow_${indexOfPokemon}`).removeAttribute("onclick");
            alert('Es werden mehr Pokemon geladen');
            closePokemonOverlay();
            await loadMorePokemon();
        }
        else if (indexOfPokemon < 1025) {
            indexOfPokemon++;
            document.getElementById('pokemonInfoOverlay').innerHTML = ``;
            openPokemonOverlay(indexOfPokemon);
        }
    }
}

function previousPokemon(indexOfPokemon) {
    if (indexOfPokemon >= 1) {
        if (indexOfPokemon === 1) {
            document.getElementById('leftArrow_0').removeAttribute("onclick");
        }
        indexOfPokemon--;
        document.getElementById('pokemonInfoOverlay').innerHTML = ``;
        openPokemonOverlay(indexOfPokemon);
    }
}

function closePokemonOverlay() {
    document.getElementById('pokemonInfoOverlay').innerHTML = ``;
    document.getElementById('pokemonInfoOverlay').classList.add('d-none');
    document.body.style.overflowY = 'auto';
}

//Funktion um mit bestimmten Tasten im Overlay zu agieren
document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
        closePokemonOverlay();
    }
    else if (evt.key === 'ArrowRight') {
        nextPokemon(allPokemon ++);
    }
    else if (evt.key === 'ArrowLeft') {
        previousPokemon(allPokemon --);
    }
});
