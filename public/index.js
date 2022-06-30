let totalNumberOfPokemon = 26;

async function displayPokemonOnFront() {
    await getRandomPokemonData().then((randomPokemon) => {
        let grid = `
            <div id="grid">
        `;
        for (row = 0; row < 3; row++) {
            grid += `<div class="row">`;
            for (col = 0; col < 3; col++) {
                index = row * 3 + col;
                grid += `
                    <div class="img-container" onclick="location.href='pokemon.html?id=${randomPokemon[index].id}'">
                        <img src="${randomPokemon[index].sprite}" alt="${randomPokemon[index].name}" style="width:100%">
                        <p>TEST</p>
                    </div> 
                    `;
                }
                grid += `</div>`;
            }
            grid += `</div>`;
            $("main").append(grid);
        }
    );
}

function loadPokemonInfo() {

}

function getPokemonInfo() {

}

async function loadPokemonById(pokemonId) {
    const pokemon = await $.get(`/pokemon/${pokemonId}/`, function (pokemon, status) {

    });
    return pokemon[0];
}

async function getRandomPokemonData() {
    let pokemonList = [];
    for (i = 0; i < 9; i++) {
        let randomPokemonId = Math.ceil(Math.random() * totalNumberOfPokemon);
        let randomPokemon = await loadPokemonById(randomPokemonId);
        pokemonList[i] = {
            id: randomPokemon['id'],
            name: randomPokemon['name'],
            sprite: randomPokemon['sprite']
        };
    }
    return pokemonList;
}

displayPokemonOnFront();