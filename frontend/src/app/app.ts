import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

  constructor(
    private recipeService: RecipeService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    console.log('App initialized');

    this.recipeService.getRecipes().subscribe({
      next: (data) => {
        console.log('Recipes from backend:', data);
        this.recipes = data;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading recipes:', error);
      }
    });
  }

  addRecipe(): void {
    this.recipeService.addRecipe(this.newRecipe).subscribe({
      next: (recipe) => {
        this.recipes = [...this.recipes, recipe];

        this.newRecipe = {
          name: '',
          description: '',
          preparationTime: 0,
          difficulty: 'EASY',
          category: ''
        };

        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error adding recipe:', error);
      }
    });
  }

  deleteRecipe(id: number | undefined): void {
    if (id === undefined) {
      return;
    }

    this.recipeService.deleteRecipe(id).subscribe({
      next: () => {
        this.recipes = this.recipes.filter(recipe => recipe.id !== id);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error deleting recipe:', error);
      }
    });
  }
}