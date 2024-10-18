package com.education.eduAPI.service;

import com.education.eduAPI.dto.CourseDTO;
import com.education.eduAPI.entity.Category;
import com.education.eduAPI.enums.Level;

import java.util.List;

public interface CourseService {

    CourseDTO createCourseUsingDto(CourseDTO courseDTO);

    String deleteCourseById(CourseDTO courseDTO);

    List<CourseDTO> getAllCourses(int page, int size);

    CourseDTO getCourseById(int id);

    CourseDTO updateCourse(CourseDTO courseDTO);

    List<CourseDTO> findCoursesByCategoryExcludingUser(String categoryName);

    List<CourseDTO> findCoursesByUser();

    List<CourseDTO> findAllCoursesByCategoryAndLevel(List<Category> categoryName, List<Level> levels);
}
