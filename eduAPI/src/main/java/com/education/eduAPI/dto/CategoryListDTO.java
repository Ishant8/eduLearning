package com.education.eduAPI.dto;

import com.education.eduAPI.entity.Category;
import com.education.eduAPI.enums.Level;

import java.util.List;

public class CategoryListDTO {
    private List<Category> categoriesList;

    private List<Level> levelList;

    public CategoryListDTO() {}

    public CategoryListDTO(List<Category> categoriesList, List<Level> levelList) {
        this.categoriesList = categoriesList;
        this.levelList = levelList;
    }

    public List<Category> getCategoriesList() {
        return categoriesList;
    }

    public void setCategoriesList(List<Category> categoriesList) {
        this.categoriesList = categoriesList;
    }

    public List<Level> getLevelList() {
        return levelList;
    }

    public void setLevelList(List<Level> levelList) {
        this.levelList = levelList;
    }

    @Override
    public String toString() {
        return "CategoryListDTO{" +
                "categoriesList=" + categoriesList +
                ", level=" + levelList +
                '}';
    }
}
