import './App.css';
import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
// ------------------[ Global variables ]------------------ //

// ------------------[ Main method ]------------------ //

const Flex = () => {
  useEffect(() => { document.body.style.backgroundColor = '#000000' }, [])
  const [pokemonProp, setPokemon] = useState(null);

  useEffect(() => {
    GetPokemon("salazzle").then((object) => setPokemon(object));
  }, []);

  return (
    <View style={styles.index}>
      <PokeInfo pokemon={pokemonProp}/>
      <PokeList/>
    </View>
  );
};

// ------------------[ Info side ]------------------ // 

function PokeInfo({ pokemon }) {
  return pokemon ? (
    <View style={[
      styles.container, 
      {
        flex: 2, 
        marginRight: 10,
        flexDirection: 'column',
      }
    ]}>
      <PokeImage pokemon={pokemon}/>
      <PokeDescription pokemon={pokemon}/>
    </View>
  ) : null;
}

// ------------------[ PokeDesc Components ]------------------ //

function PokeImage({pokemon}) {
  return <View style={[styles.container,{flex: 1, margin: 20, alignItems: 'center'}]}>
    <Image source={pokemon.sprites.front_default} style={{ height: "100%", width: "60%" }} />
  </View>
}

function PokeDescription({pokemon}) {
  return <View style={[styles.container,{flex: 2, margin: 20, padding: 10}]} >
    <p>Name: {pokemon.name}</p>
    <p>ID: {pokemon.id}</p>
    <p>Weight: {pokemon.weight/10}</p>
    <p>Height: {pokemon.height}</p>
    

  </View>
}

// ------------------[ List side ]------------------ //

const PokeList = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    ShowPokemons(50).then((data) => setPokemons(data));
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          flex: 7,
        },
      ]}
    >
      <View style={[{ flexDirection: "row", flex: 1 }]}>
        {pokemons.slice(0, 5).map((pokemon) => (
          <PokeCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </View>
      <View style={[{ flexDirection: "row", flex: 1 }]}>
        {pokemons.slice(5, 10).map((pokemon) => (
          <PokeCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </View>
      <View style={[{ flexDirection: "row", flex: 1 }]}>
        {pokemons.slice(10, 15).map((pokemon) => (
          <PokeCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </View>
    </View>
  );
};

// ------------------[ List Components ]------------------ //

function PokeCard({ pokemon }) {
  return (
    <View
      style={[
        styles.container,
        {
          flex: 1,
          borderTopWidth: 1,
          borderColor: "black",
          backgroundColor: "white",
          margin: 10,
          alignItems: "center",
        },
      ]}
    >
      <Image source={{ uri: pokemon.image }} style={{ height: "80%", width: "80%" }} />
      <Text>{pokemon.name}</Text>
    </View>
  );
}

// ------------------[ Style Sheets ]------------------ //

const styles = StyleSheet.create({
  index: {
    flex: 1,
    flexDirection: 'row',
    height: 700,
    padding: 40
  },
  container: {
    borderRadius: 10,
    shadowColor: 'black',
    shadowRadius: 4,
    backgroundColor: '#F0F8FF'
  },
  image: {
    margin: 10
  }
})

// ------------------[ Poke API calls ]------------------ //

async function GetPokemon(pokemon) {
  return await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
                    .then(response => response.json())
}

async function ShowPokemons(page) {
  let offset = page * 15;

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=15&offset=${offset}`
  );
  const data = await response.json();

  const pokemonUrls = data.results.map((result) => result.url);
  const pokemonData = await Promise.all(
    pokemonUrls.map((url) => fetch(url).then((res) => res.json()))
  );

  return pokemonData.map((pokemon) => ({
    name: pokemon.name,
    image: pokemon.sprites.front_default,
  }));
}

export default Flex;