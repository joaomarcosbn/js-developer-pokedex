class Pokemon {
    constructor() {
        this.number = '';
        this.name = '';
        this.type = '';
        this.types = [];
        this.photo = '';
        this.height = '';
        this.weight = '';
        this.abilities = [];
        this.stats = [];
    }
}

// Exporte a classe para que ela possa ser usada em outros arquivos
export default Pokemon;

const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    pokemon.abilities = abilities

    const stats = pokeDetail.stats.map((statSlot) => ({
        name: statSlot.stat.name,
        baseStat: statSlot.base_stat
    }))
    pokemon.stats = stats

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

// Função para buscar os detalhes do Pokémon com base no nome
pokeApi.getPokemonDetails = (name) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokémon não encontrado")
            }
            return response.json()
        })
        .then(convertPokeApiDetailToPokemon)
}

// Exibe o Pokémon na tela
export function displayPokemon(pokemon) {
    const pokemonDetailContainer = document.getElementById('pokemon-detail-container')

    pokemonDetailContainer.innerHTML = `
        <div class="header">
            <h1>${pokemon.name}</h1>
            <span class="number">#${pokemon.number}</span>
        </div>
        <div class="image-container">
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
        <div class="container">
            <div class="tags">
                ${pokemon.types.map((type) => `<span class="tag${type}">${type}</span>`).join('')}
            </div>
            <div class="about">
                <h2>About</h2>
                <div class="details">
                    <div>
                        <p><strong>${pokemon.weight} kg</strong></p>
                        <p>Weight</p>
                    </div>
                    <div>
                        <p><strong>${pokemon.height} m</strong></p>
                        <p>Height</p>
                    </div>
                    <div>
                        ${pokemon.abilities.map((ability) => `<p><strong>${ability}</strong><br>`).join('')}
                        <p>Abilities</p>
                    </div>
                </div>
            </div>
            <div class="base-stats">
                <h2>Base Stats</h2>
                <div class="stats">
                    ${pokemon.stats.map((stat) => `
                        <div class="stat">
                            <span class="label">${stat.name}</span>
                            <span class="divider"></span>
                            <span>${stat.baseStat}</span>
                            <progress value="${stat.baseStat}" max="100" class="progressBar"></progress>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `
}

// Exporte o objeto pokeApi para ser usado em outros arquivos
export { pokeApi };