package com.education.eduAPI.service;

import com.education.eduAPI.dto.CourseDTO;
import com.education.eduAPI.dto.SectionDTO;
import com.education.eduAPI.entity.Category;
import com.education.eduAPI.enums.Level;

import java.io.IOException;
import java.util.List;

public interface CourseService {

    CourseDTO createCourseUsingDto(CourseDTO courseDTO, List<SectionDTO> sectionList) throws IOException;

    String deleteCourseById(int courseId);

    List<CourseDTO> getAllCourses(int page, int size);

    CourseDTO getCourseById(int id);

    CourseDTO updateCourse(CourseDTO courseDTO) throws IOException;

    List<CourseDTO> findCoursesByCategoryExcludingUser(String categoryName);

    List<CourseDTO> findCoursesByUser();

    List<CourseDTO> findAllCoursesByCategoryAndLevel(List<Category> categoryName, List<Level> levels, int page, int size);

    List<CourseDTO> findAllCoursesByCourseNameOrInstructor(String searchItem);

    List<CourseDTO> findAllCoursesByInstructor(String instructorEmail);

    Integer totalEnrolledStudents(int courseId);
}
