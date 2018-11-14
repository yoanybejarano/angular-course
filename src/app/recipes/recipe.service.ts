import {Subject} from 'rxjs';
import {RecipeModel} from './recipe.model';
import {IngredientModel} from '../shared/ingredient.model';


export class RecipeService {

  recipeChanged = new Subject<RecipeModel[]>();

  private recipes: RecipeModel[] = [
    new RecipeModel(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new IngredientModel('Meat', 1),
        new IngredientModel('French Fries', 20)
      ]),
    new RecipeModel('Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new IngredientModel('Buns', 2),
        new IngredientModel('Meat', 1)
      ])
  ];

  constructor() {
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  setRecipes(recipes: RecipeModel[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  addRecipe(recipe: RecipeModel) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: RecipeModel) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index , 1);
    this.recipeChanged.next(this.recipes.slice());
  }

}
