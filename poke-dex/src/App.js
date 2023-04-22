import './App.css';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import './PokeAPI.js'
// ------------------[ Global variables ]------------------ //


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
        flex: 2,
        marginRight: 10
      }
      ]}>
        <View style={[{
          flexDirection: 'column'}
        ]}>

        </View>
    </View>)
}

const PokeList = () => {
  const [page, setPages] = React.useState(1)

  return (
    <View style={[
      styles.container, 
      {
        flex: 7 
      }
      ]}>
        
    </View>
  )
}

// ------------------[ Pokemon Components ]------------------ //

function PokeImage(src) {
  return <box  />
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
