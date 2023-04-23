import '../App.css';
import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, Pressable} from 'react-native';
// ------------------[ Global variables ]------------------ //

// ------------------[ Main method ]------------------ //

const Flex = () => {
  const [pokemonProp, setPokemon] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    GetPokemon("klinklang").then((object) => setPokemon(object));
  }, []);

  const handlePokeCardClick = (pokemon) => {
    setPokemon(pokemon);
  };

  return (
    <View style={styles.index}>
      <PokeInfo pokemon={pokemonProp} setCurrentPage={setPage} currentPage={page}/>
      <PokeList onPokeCardClick={handlePokeCardClick} currentPage={page}/>
    </View>
  );
};

// ------------------[ Info side ]------------------ // 

function PokeInfo({ pokemon, setCurrentPage, currentPage }) {
  return pokemon ? (
    <View style={[styles.container, {flex: 2, marginRight: 10,flexDirection: 'column',}]}>
      <PokeImage pokemon={pokemon}/>
      <PokeDescription pokemon={pokemon}/>
      <PrevNext setPage={setCurrentPage} page={currentPage}></PrevNext>
    </View>
  ) : null;
}

// ------------------[ PokeDesc Components ]------------------ //

function PokeImage({pokemon}) {
  return <View style={[styles.container,{flex: 4, margin: 20, alignItems: 'center'}]}>
    <Image source={{ uri: pokemon.image }} style={{ height: "100%", width: "60%" }} />
  </View>
}

function PokeDescription({pokemon}) {
  return <View style={[styles.container,{flex: 8, margin: 20, padding: 10}]} >
    <p>Name: {pokemon.name}</p>
    <p>ID: {pokemon.id}</p>
    <p>Weight: {pokemon.weight/10}</p>
    <p>Height: {pokemon.height}</p>
    <p>Species: {pokemon.type}</p>
    

  </View>
}

function PrevNext({ setPage, page }) {
  const onNext = () => {
    setPage((page) => page + 1);
  };

  const onPrev = () => {
    setPage((page) => page - 1);
  };

  return (
    <View style={[{flex: 1, flexDirection: 'row', alignContent: 'space-between', padding: 5}]}>
      <Pressable style={[styles.container, styles.button]} onPress={onPrev}>
        <Text>prev</Text>
      </Pressable>
      <Pressable style={[styles.container, styles.button]} onPress={onNext}>
        <Text>next</Text>
      </Pressable>
    </View>
  );
}

// ------------------[ List side ]------------------ //

function PokeList({ onPokeCardClick, currentPage }) {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    ShowPokemons(currentPage).then((data) => setPokemons(data));
  }, [currentPage]);

  return (
    <View style={[styles.container,{flex: 7,},]}>
      <View style={[{ flexDirection: "row", flex: 1 }]}>
        {pokemons.slice(0, 5).map((pokemon) => (
          <PokeCard key={pokemon.name} pokemon={pokemon} onPokeCardClick={onPokeCardClick} />
        ))}
      </View>
      <View style={[{ flexDirection: "row", flex: 1 }]}>
        {pokemons.slice(5, 10).map((pokemon) => (
          <PokeCard key={pokemon.name} pokemon={pokemon} onPokeCardClick={onPokeCardClick} />
        ))}
      </View>
      <View style={[{ flexDirection: "row", flex: 1 }]}>
        {pokemons.slice(10, 15).map((pokemon) => (
          <PokeCard key={pokemon.name} pokemon={pokemon} onPokeCardClick={onPokeCardClick} />
        ))}
      </View>
    </View>
  );
}

// ------------------[ List Components ]------------------ //

function PokeCard({ pokemon, onPokeCardClick }) {
  const handlePress = () => {
    onPokeCardClick(pokemon);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.container, styles.pokecard]}>
      <Image source={{ uri: pokemon.image }} style={{ height: "80%", width: "80%" }} />
      <Text>{pokemon.name}</Text>
    </TouchableOpacity>
  );
}

// ------------------[ Style Sheets ]------------------ //

const styles = StyleSheet.create({
  index: {
    flex: 1,
    flexDirection: 'row',
    height: 780,
    padding: 40
  },
  container: {
    borderRadius: 10,
    shadowColor: 'black',
    shadowRadius: 3,
    backgroundColor: '#F0F8FF'
  },
  image: {
    margin: 10
  }, 
  pokecard: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
    margin: 10,
    alignItems: "center"
  },
  button: {
    backgroundColor: 'white',
    flex: 1, 
    height:'80%', 
    marginLeft: 10, 
    marginRight: 10, 
    alignItems: 'center', 
    justifyContent: 'center'
  }
})

// ------------------[ Poke API calls ]------------------ //

async function GetPokemon(pokemon) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const data = await response.json();

  return {
    name: data.name,
    image: data.sprites.front_default,
    id: data.id,
    weight: data.weight,
    height: data.height,
    type: data.types[0].type.name,
  };
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

  console.log(pokemonData);

  return pokemonData.map((pokemon) => ({
    name: pokemon.name,
    image: pokemon.sprites.front_default,
    id: pokemon.id,
    weight: pokemon.weight,
    height: pokemon.height,
    type: pokemon.types[0].type.name,
  }));
}

export default Flex;