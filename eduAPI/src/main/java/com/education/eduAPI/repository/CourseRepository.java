package com.education.eduAPI.repository;

import com.education.eduAPI.entity.Category;
import com.education.eduAPI.entity.Course;
import com.education.eduAPI.entity.User;
import com.education.eduAPI.enums.Level;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Integer> {

    List<Course> findByUsers(User user);

    Course findCourseByCourseName(String courseName);

    Page<Course> findAll(Pageable pageable);

    List<Course> findAllByCourseNameIn(List<String> courseNames);

    List<Course> findAllByCategoryAndUsersNotContaining(Category category, User user);

    List<Course> findAllByCategoryInAndLevelIn(List<Category> categories, List<Level> levels);
}
