import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {RecipeModel} from '../recipes/recipe.model';
import {map} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    const token = this.authService.getToken();
    return this.http.put('https://ng-recipe-book-6c4f5.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
  }

  getRecipes() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('x-auth', '123456789');
    return this.http.get('https://ng-recipe-book-6c4f5.firebaseio.com/recipes.json',
      {
        observe: 'response',
        params: new HttpParams().set('auth', token),
        reportProgress: true
        // headers: headers
      })
      .pipe(
        map(
          (response: HttpResponse<any>) => {
            const recipes: RecipeModel[] = response.body;
            for (const recipe of recipes) {
              if (!recipe['ingredients']) {
                console.log(recipe);
                recipe['ingredients'] = [];
              }
            }
            return recipes;
          }
        )
      ).subscribe((recipes: RecipeModel[]) => {
        this.recipeService.setRecipes(recipes);
      });
  }


}
