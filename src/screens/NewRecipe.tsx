import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { RECIPES_QUERY } from "../screens/AllRecipes";
import { RecipeForm } from "../components/RecipeForm";



const ADD_RECIPE = gql`
mutation AddRecipe(
  $title: String!,
  $time: String!,
  $method: [String]!,
  $ingredients: [IngredientsInput]!
  ) {
  addRecipe(
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

export interface RecipeProps {
 __typename?: String;
 _id?: String;
 title?: String;
 time?: String;
 method?: [String];
 ingredients?: {
   name?: String;
   quantity?: String;
 }[];
}

export interface AllRecipes {
 allRecipes: [RecipeProps]
}

interface RecipeData {
 addRecipe: RecipeProps
}

export const NewRecipe = () => {
  const [addRecipe] = useMutation<RecipeData, RecipeProps>(ADD_RECIPE, 
    { onCompleted(): void {
    console.log('COMPLETED');
    },
    update(cache, { data }) {
      const recipeData = cache.readQuery<AllRecipes>({ query: RECIPES_QUERY });

      data && recipeData && cache.writeQuery({
        query: RECIPES_QUERY,
        data: { allRecipes: recipeData.allRecipes.concat([data.addRecipe])}
      })
    }
  });

  const [method, setMethod] = useState<any>([]);
  const [ingredients, setIngredients] = useState<any>([]);

  const onSubmit = ({ title, time }: RecipeProps) => {
    addRecipe({ variables: { title, time, method, ingredients }});
  }

  return (
    <View>
      <Text>New Recipe Form</Text>
      <RecipeForm method={method} setMethod={setMethod} onSubmit={onSubmit} ingredients={ingredients} setIngredients={setIngredients} />
    </View>
  );

}