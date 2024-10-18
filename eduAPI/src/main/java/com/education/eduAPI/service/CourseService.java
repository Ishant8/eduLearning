package com.education.eduAPI.service;

import com.education.eduAPI.dto.CourseDTO;

import java.io.IOException;
import java.util.List;

public interface CourseService {

    CourseDTO createCourseUsingDto(CourseDTO courseDTO) throws IOException;

    String deleteCourseById(CourseDTO courseDTO);

    List<CourseDTO> getAllCourses(int page, int size);

    CourseDTO getCourseById(int id);

    CourseDTO updateCourse(CourseDTO courseDTO);

    List<CourseDTO> findCoursesByCategoryExcludingUser(String categoryName);

    List<CourseDTO> findCoursesByUser();
}
