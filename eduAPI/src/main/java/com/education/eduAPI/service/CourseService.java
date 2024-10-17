package com.education.eduAPI.service;

import com.education.eduAPI.dto.CourseDTO;

import java.util.List;

public interface CourseService {

    CourseDTO createCourseUsingDto(CourseDTO courseDTO);

    String deleteCourseById(CourseDTO courseDTO);

    List<CourseDTO> getAllCourses(int page, int size);

    CourseDTO getCourseById(int id);

    CourseDTO updateCourse(CourseDTO courseDTO);
}
