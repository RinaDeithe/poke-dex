import './App.css';
import React from 'react';
import {StyleSheet, View} from 'react-native';
// ------------------[ Global variables ]------------------ //


// ------------------[ Main method ]------------------ //

const Flex = () => {

  const [pokemon, setPokemon] = React.useState(GetPokemon("ditto"))

  return (
  <View style={styles.index}>
    <PokeInfo pokemon={pokemon}/>
    <PokeList/>
  </View>
)};

// ------------------[ Info side ]------------------ //

function PokeInfo(pokemon) {
  return (
    <View style={[
      styles.container, 
      {
        flex: 2,
        marginRight: 10,
        flexDirection: 'column'
      }
      ]}>
        <PokeImage pokemon={pokemon}/>
        <PokeDescription/>
    </View>)
}

// ------------------[ PokeDesc Components ]------------------ //

function PokeImage(pokemon) {
  return <View style={[{flex: 1, backgroundColor: 'yellow', margin: 20}]}>
    <img/>
  </View>
}

function PokeDescription(pokemon) {
  return <View style={[{flex: 2, backgroundColor: 'green', margin: 20}]} >

  </View>
}

// ------------------[ List side ]------------------ //

const PokeList = () => {
  const [page, setPage] = React.useState(0)

  let pokemons = ShowPokemons(page)

  return (
    <View style={[
      styles.container, 
      {
        flex: 7 
      }
    ]}>
      <View style={[{flexDirection: 'row', flex: 1}]}>
        <PokeCard/>
        <PokeCard/>
        <PokeCard/>
        <PokeCard/>
        <PokeCard/>
      </View>
      <View style={[{flexDirection: 'row', flex: 1}]}>
        <PokeCard/>
        <PokeCard/>
        <PokeCard/>
        <PokeCard/>
        <PokeCard/>
      </View>
      <View style={[{flexDirection: 'row', flex: 1}]}>
        <PokeCard/>
        <PokeCard/>
        <PokeCard/>
        <PokeCard/>
        <PokeCard/>
      </View>
    </View>
  )
}

// ------------------[ List Components ]------------------ //

function PokeCard(pokemon) {
  return (
    <View style={[styles.container, {flex: 1, borderTopWidth: 1, borderColor: 'black', backgroundColor: 'white', margin: 10, alignItems: 'center'}]}>
      <img/>
      <p>{pokemon["name"]} tempTest</p>
    </View>
  )
}

// ------------------[ Style Sheets ]------------------ //

const styles = StyleSheet.create({
  index: {
    flex: 1,
    flexDirection: 'row',
    height: 700,
    padding: 20
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

async function ShowPokemons(page) {

  let offset = page*15

  try {
      await fetch(`pokemon?limit=15&offset=${offset}`)
          .then(response => response.json())
          .then(data => {
            let results = data.results.map(result => {
              return fetch(result.url)
                    .then(response => response.json())
            })
            return Promise.all(results);
          })
  }   
  catch {
      return null
  }
}

export default Flex;