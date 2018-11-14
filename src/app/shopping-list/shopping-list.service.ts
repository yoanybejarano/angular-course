import {Injectable} from '@angular/core';
import {IngredientModel} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredientsChanges = new Subject<IngredientModel[]>();
  startedEditing = new Subject<number>();
  private ingredients: IngredientModel[] = [
    new IngredientModel('Apples', 5),
    new IngredientModel('Tomatoes', 10)
  ];

  constructor() {
  }

  addIngredients(ingredients: IngredientModel[]) {
    // for (const ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientsChanges.next(this.ingredients.slice());
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(index: number, newIngredient: IngredientModel) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanges.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanges.next(this.ingredients.slice());
  }

}
