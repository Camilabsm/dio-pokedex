const listaPokemons = document.querySelector('#list');
const loadMoreButton = document.querySelector('#loadMore');
const limit = 10;
let offset = 0;
const maxRecords = 151;


function insertPokemonInHtml(pokemon){
    return `<li class="pokemon ${pokemon.type}">
    <span class="number">#${pokemon.order}</span>
    <span class="name">${pokemon.name}</span>
    <div class="detail">
        <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>
        <img src="${pokemon.photo}" alt="${pokemon.name}">
    </div>
</li>`
}


function loadPokemonItems(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
        listaPokemons.innerHTML += pokemonList.map(insertPokemonInHtml).join('');
    })  
}

loadPokemonItems(offset, limit);

let qtdRegistros = 10;

loadMoreButton.addEventListener("click", () => {
    offset += limit;

    if ((qtdRegistros + limit) >= maxRecords){
        const newLimit = maxRecords - qtdRegistros;
        loadPokemonItems(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
        qtdRegistros += newLimit;
    } else {
        loadPokemonItems(offset, limit);
        qtdRegistros += limit; 
    }
});