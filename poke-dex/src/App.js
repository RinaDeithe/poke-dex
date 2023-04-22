import './App.css';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import './PokeAPI.js'

// ------------------[ Main method ]------------------ //

const Flex = () => {
  return (
  <View style={styles.index}>
    <PokeInfo/>
    <PokeList/>
  </View>
)};

const PokeInfo = () => {
  return (
    <View style={[
      styles.container, 
      {
        backgroundColor: 'yellow',
        flex: 2  
      }
      ]}></View>)
}

const PokeList = () => {
  return (
    <View style={[
      styles.container, 
      {
        backgroundColor: 'red',
        flex: 7
        
      }
      ]}>
        
    </View>
  )
}

// ------------------[ Pokemon Components ]------------------ //

function PokeImage(src) {
  return <image src={src} alt="Image" />
}

// ------------------[ Style Sheets ]------------------ //

const styles = StyleSheet.create({
  index: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'green',
    height: 700,
    padding: 20,
  },
  container: {
    padding: 10
  }
})

export default Flex;
