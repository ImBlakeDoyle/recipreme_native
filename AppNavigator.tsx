import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import AllRecipes from "./src/screens/AllRecipes";

const navigator = createStackNavigator(
  {
    Index: AllRecipes
  },
  {
    initialRouteName: "Index"
  }
);

export default createAppContainer(navigator);