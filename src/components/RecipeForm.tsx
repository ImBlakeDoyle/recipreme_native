import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, FlatList } from 'react-native';
import { useForm, Controller } from "react-hook-form";


export const RecipeForm = (props: any): any => {
  const { control, handleSubmit, errors } = useForm();
  const [currentMethod, setCurrentMethod] = useState<string>('');

  const { method, setMethod, onSubmit, title, time } = props;

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

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      
    </View>
  );
}