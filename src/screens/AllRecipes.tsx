import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const AllRecipes = () => {
  return (
    <View>
      <Text style={styles.textStyle}>All Recipes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 50
  }
});

export default AllRecipes;