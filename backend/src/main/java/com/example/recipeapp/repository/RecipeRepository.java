package com.example.recipeapp.repository;

import com.example.recipeapp.model.Difficulty;
import com.example.recipeapp.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findByDifficulty(Difficulty difficulty);
}