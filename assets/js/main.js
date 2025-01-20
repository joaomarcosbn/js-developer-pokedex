import { pokeApi, displayPokemon } from './poke-api.js'; // Agora você importa as funções corretamente

// Lógica para o formulário de busca
document.getElementById('search-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Isso impede o envio do formulário

    const pokemonName = document.getElementById('search-input').value.trim();

    if (pokemonName) {
        pokeApi.getPokemonDetails(pokemonName)
            .then(displayPokemon)  // Usa a função displayPokemon para mostrar o Pokémon
            .catch((error) => {
                alert(error.message);
                document.getElementById('pokemon-detail-container').innerHTML = '';
            });
    }
});