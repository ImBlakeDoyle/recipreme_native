import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList, Button, TouchableOpacity } from 'react-native';
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { AllRecipes, RecipeProps } from "./NewRecipe";
import { RECIPES_QUERY } from "./AllRecipes";
import { RecipeForm } from "../components/RecipeForm";

const DELETE_RECIPE = gql`
mutation DeleteRecipe(
  $_id: ID!
  ) {
 deleteRecipe(
   _id: $_id
  ) 
 {
   _id
   title
   time
   method
 }
}`;

const UPDATE_RECIPE = gql`
mutation UpdateRecipe(
  $_id: ID!,
  $title: String!,
  $time: String!,
  $method: [String]!,
  $ingredients: [IngredientsInput]!
  ) {
  updateRecipe(
   _id: $_id,
   input: {
     title: $title,
     time: $time,
     method: $method,
    ingredients: $ingredients
  }) 
 {
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

interface RecipeData {
  deleteRecipe: RecipeProps;
}

export const RecipeView = ({ navigation }: any) => {
  const { time, title, method, ingredients, _id } = navigation.state.params.item;
  const [deleteRecipe] = useMutation<RecipeData, RecipeProps>(DELETE_RECIPE, {
    onCompleted() {
      navigation.navigate('Index')
    },
    update(cache, { data }) {
      const recipeData = cache.readQuery<AllRecipes>({ query: RECIPES_QUERY });
      const updatedRecipes = recipeData?.allRecipes.filter(recipe => recipe._id !== _id);

      data && recipeData && cache.writeQuery({
        query: RECIPES_QUERY,
        data: { allRecipes: updatedRecipes }
      })
    }
  });
  const [updateRecipe] = useMutation(UPDATE_RECIPE, {
    onCompleted() {
      navigation.navigate('Index')
    },
    update(cache, { data }) {
      console.log("THE DATA IS", data);
    }
  });

  console.log(ingredients);

  const [isEditing, setIsEditing] = useState<Boolean>(false);
  const [editedMethod, setEditedMethod] = useState<any>([]);
  const [editedIngredients, setEditedIngredients] = useState<any>([]);

  useEffect(() => {
    if (method.length) {
      setEditedMethod(method);
    }
    if (ingredients.length) {
      ingredients.forEach((ingredient: any) => { delete ingredient.__typename });
      setEditedIngredients(ingredients);
    }
  }, [method, ingredients]);

  const onSubmit = ({ title, time }: RecipeProps) => {
    updateRecipe({ variables: { _id, title, time, method: editedMethod, ingredients: editedIngredients }});
  }

  if (!isEditing) {
    return (
      <View>
        <Text>{title}</Text>
        <Text>{time}</Text>
        <Text>Method</Text>
          <FlatList
          keyExtractor={(item, index) => `${item}-${index}`}
          data={method}
          renderItem={({ item, index }) => {
            return(
              <View>
                <Text>Step {index + 1}</Text>
                <Text>{item}</Text>
              </View>
            ) 
          }} />
        <Text>Ingredients</Text>
          <FlatList
            keyExtractor={(item) => `${item.name}-${item.quantity}`}
            data={ingredients}
            renderItem={({ item }) => {
              return (
                <View>
                  <Text>{item.quantity} {item.name}</Text>
                </View>
              )
            }} />
        <Button title="Delete" onPress={() => deleteRecipe({ variables: { _id } })} />
        <Button title="Edit" onPress={() => setIsEditing(!isEditing)}/>
      </View>
    );
  }
  else return (
    <View>
      <RecipeForm title={title} time={time} method={editedMethod} setMethod={setEditedMethod} onSubmit={onSubmit} ingredients={editedIngredients} setIngredients={setEditedIngredients} />
    </View>
  );
}