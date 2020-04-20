import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { View, StyleSheet, Text, FlatList, Button, TouchableOpacity } from 'react-native';

export const RECIPES_QUERY = gql`
{
  allRecipes {
    _id
    title
    time
    method
    ingredients {
      name
      quantity
    }
  }
}`;

export const AllRecipes = (props: any) => {
  const { navigation } = props;
  const { loading, data } = useQuery(RECIPES_QUERY);

  if(!loading) {
    return (
      <View>
        <Text style={styles.textStyle}>All Recipes</Text>
        <FlatList
          keyExtractor={item => item._id} 
          data={data.allRecipes}
          renderItem={({ item }) => {
            return (
              <View>
                <TouchableOpacity onPress={() => navigation.navigate('View', { item, testParam: "TEST PARAM" })}>
                  <Text>{item.title}</Text>
                </TouchableOpacity>
              </View>
            )
          }}
          />
          <Button 
            onPress={() => navigation.navigate("New")}
            title="Add new recipe"
          />
      </View>
    );
  }
  else return null;
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 50
  }
});

export default AllRecipes;