async function GetPokemon(pokemon) {
    try {
        await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon)
            .then(response => {
                if (response.ok) return response.json();
                else new Error("Pokemon or network not found.");
            })
    }   
    catch {
        return null
    }
}

async function ShowPokemons(offset) {
    try {
        await fetch(`pokemon?limit=25&offset=${offset}`)
            .then(response => {
                if (response.ok) return response.json();
                else new Error("Pokemon or network not found.");
            })
    }   
    catch {
        return null
    }
}