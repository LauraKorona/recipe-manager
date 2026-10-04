package com.example.recipeapp.controller;

import com.example.recipeapp.model.Difficulty;
import com.example.recipeapp.model.Recipe;
import com.example.recipeapp.repository.RecipeRepository;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.Optional;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    private final RecipeRepository recipeRepository;

    public RecipeController(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    @GetMapping
    public List<Recipe> getAllRecipes(@RequestParam(required = false) Difficulty difficulty) {
        return difficulty == null
                ? recipeRepository.findAll()
                : recipeRepository.findByDifficulty(difficulty);
    }

    @PostMapping
    public Recipe createRecipe(@Valid @RequestBody Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    @GetMapping("/{id}")
    public Optional<Recipe> getRecipeById(@PathVariable Long id) {
        return recipeRepository.findById(id);
    }

    @PutMapping("/{id}")
    public Recipe updateRecipe(@PathVariable Long id, @Valid @RequestBody Recipe updatedRecipe) {
        return recipeRepository.findById(id)
                .map(recipe -> {
                    recipe.setName(updatedRecipe.getName());
                    recipe.setDescription(updatedRecipe.getDescription());
                    recipe.setPreparationTime(updatedRecipe.getPreparationTime());
                    recipe.setDifficulty(updatedRecipe.getDifficulty());
                    recipe.setCategory(updatedRecipe.getCategory());

                    return recipeRepository.save(recipe);
                })
                .orElseThrow();
    }

    @DeleteMapping("/{id}")
    public void deleteRecipe(@PathVariable Long id) {
        recipeRepository.deleteById(id);
    }
}