import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Recipe } from './models/recipe';
import { RecipeService } from './services/recipe.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  recipes: Recipe[] = [];
  newRecipe: Recipe = {
    name: '',
    description: '',
    preparationTime: 0,
    difficulty: 'EASY',
    category: ''
  };

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

  addRecipe(): void {
    this.recipeService.addRecipe(this.newRecipe).subscribe({
      next: (recipe) => {
        this.recipes.push(recipe);

        this.newRecipe = {
          name: '',
          description: '',
          preparationTime: 0,
          difficulty: 'EASY',
          category: ''
        };
      },
      error: (error) => {
        console.error('Error adding recipe:', error);
      }
    });
  }
}