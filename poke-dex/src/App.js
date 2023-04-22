import './App.css';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import './PokeAPI.js'
// ------------------[ Global variables ]------------------ //


// ------------------[ Main method ]------------------ //

const Flex = () => {

  const [pokemon, setPokemon] = React.useState(null)

  return (
  <View style={styles.index}>
    <PokeInfo/>
    <PokeList/>
  </View>
)};

// ------------------[ Info side ]------------------ //

const PokeInfo = () => {
  return (
    <View style={[
      styles.container, 
      {
        flex: 2,
        marginRight: 10,
        flexDirection: 'column'
      }
      ]}>
        <PokeImage/>
        <PokeDescription/>
    </View>)
}

// ------------------[ PokeDesc Components ]------------------ //

function PokeImage(src) {
  return <View style={[{flex: 1, backgroundColor: 'yellow', margin: 20}]}></View>
}

function PokeDescription() {
  return <View style={[{flex: 2, backgroundColor: 'green', margin: 20}]} />
}

// ------------------[ List side ]------------------ //

const PokeList = () => {
  const [page, setPages] = React.useState(1)

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
    <View style={[styles.container, {flex: 1, borderTopWidth: 1, borderColor: 'black', backgroundColor: 'white', margin: 10}]}>
      <img />
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

export default Flex;
