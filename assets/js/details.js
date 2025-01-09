const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');

// Função para buscar os detalhes do Pokémon
pokeApi.getPokemonDetails(pokemonId).then((pokemon) => {
    // Preencher os dados no HTML
    document.getElementById('pokemonName').innerText = pokemon.name;
    document.getElementById('pokemonNumber').innerText = `#${pokemon.number}`;
    document.getElementById('pokemonImage').src = pokemon.photo;

    // Tipos
    const typesHtml = pokemon.types.map(type => `<span class="tag ${type}">${type}</span>`).join('');
    document.getElementById('pokemonTypes').innerHTML = typesHtml;

    // Peso, Altura, Habilidades
    document.getElementById('pokemonWeight').innerText = `${pokemon.weight} kg`;
    document.getElementById('pokemonHeight').innerText = `${pokemon.height} m`;
    document.getElementById('pokemonAbilities').innerHTML = pokemon.abilities.join('<br>');

    // Descrição
    document.getElementById('pokemonDescription').innerText = pokemon.description;
});