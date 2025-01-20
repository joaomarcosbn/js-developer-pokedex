import { pokeApi, displayPokemon } from './poke-api.js';

// Adiciona o evento no botão, não apenas no formulário
document.getElementById('search-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o redirecionamento

    const pokemonName = document.getElementById('search-input').value.trim();

    if (pokemonName) {
        pokeApi.getPokemonDetails(pokemonName)
            .then(displayPokemon)
            .catch((error) => {
                alert(error.message);
                document.getElementById('pokemon-detail-container').innerHTML = '<p>Pokémon não encontrado.</p>';
            });
    }
});