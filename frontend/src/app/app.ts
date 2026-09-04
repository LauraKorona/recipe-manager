import { Component, OnInit } from '@angular/core';
import { Recipe } from './models/recipe';
import { RecipeService } from './services/recipe.service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    console.log('App initialized');

    this.recipeService.getRecipes().subscribe({
      next: (data) => {
        console.log('Recipes from backend:', data);
        this.recipes = data;
      },
      error: (error) => {
        console.error('Error loading recipes:', error);
      }
    });
  }
}