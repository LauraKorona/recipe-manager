import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private apiUrl = 'http://localhost:8081/api/recipes';

  constructor(private http: HttpClient) {
  }

  getRecipes(difficulty? : string): Observable<Recipe[]>
  {
    if (difficulty != null) difficulty = difficulty.trim();
    
    const options = difficulty
    ? {params: new HttpParams().set('difficulty', difficulty)}
    : {};

    return this.http.get<Recipe[]>(this.apiUrl, options);
  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.apiUrl, recipe);
  }

  deleteRecipe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateRecipe(id: number, recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.apiUrl}/${id}`, recipe);
  }
}