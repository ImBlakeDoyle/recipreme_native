import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, FlatList } from 'react-native';
import { useForm, Controller } from "react-hook-form";


export const RecipeForm = (props: any): any => {
  const { control, handleSubmit, errors } = useForm();
  const [currentMethod, setCurrentMethod] = useState<string>("");
  const [currentIngredient, setCurrentIngredient] = useState<any>({ name: "", quantity: "" });

  const { method, setMethod, ingredients, setIngredients, onSubmit, title, time } = props;

  return (
    <View>
      <Text>Title</Text>
      <Controller
        as={TextInput}
        control={control}
        name="title"
        onChange={args => args[0].nativeEvent.text}
        rules={{ required: true }}
        defaultValue={ title || ""}
      />
      {errors.title && <Text>This is required.</Text>}

      <Text>Time</Text>
      <Controller
        as={TextInput}
        control={control}
        name="time"
        onChange={args => args[0].nativeEvent.text}
        defaultValue={ time || ""}
      />

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
        }}
      />
      <Text>Step {method.length + 1}</Text>
      <TextInput value={currentMethod} onChange={e => setCurrentMethod(e.nativeEvent.text)} />
      <Button title="Add step" onPress={() => {
        setMethod([...method, currentMethod]);
        setCurrentMethod("");
      }} />

    <Text>Ingredients</Text>
      <FlatList
        keyExtractor={(item, index) => `${item}-${index}`}
        data={ingredients}
        renderItem={({ item }) => {
          return(
            <View>
              <Text>{item.quantity} - {item.name}</Text>
            </View>
          )
        }}
      />
      <Text>Name</Text>
      <TextInput value={currentIngredient.name} onChange={e => setCurrentIngredient({ ...currentIngredient, name: e.nativeEvent.text })} />
      
      <Text>Quantity</Text>
      <TextInput value={currentIngredient.quantity} onChange={e => setCurrentIngredient({ ...currentIngredient, quantity: e.nativeEvent.text })} />
      
      <Button title="Add Ingredient" onPress={() => {
        setIngredients([...ingredients, currentIngredient]);
        setCurrentIngredient({ name: "", quantity: "" });
      }} />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      
    </View>
  );
}