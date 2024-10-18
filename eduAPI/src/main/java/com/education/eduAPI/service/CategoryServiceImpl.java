package com.education.eduAPI.service;

import com.education.eduAPI.entity.Category;
import com.education.eduAPI.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<String> findAllCategory() {
        return categoryRepository.findAll().stream().map(Category::getCategoryName).toList();
    }
}
