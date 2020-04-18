import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import { AllRecipes } from "./src/screens/AllRecipes";
import { RecipeForm } from "./src/components/RecipeForm";
import { RecipeView } from "./src/screens/RecipeView";
import { NewRecipe } from "./src/screens/NewRecipe";

const navigator = createStackNavigator(
  {
    Index: AllRecipes,
    New: NewRecipe,
    View: RecipeView
  },
  {
    initialRouteName: "Index"
  }
);

export default createAppContainer(navigator);