package com.education.eduAPI.repository;

import com.education.eduAPI.entity.Category;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {


    Category findByCategoryName(String name);
}
