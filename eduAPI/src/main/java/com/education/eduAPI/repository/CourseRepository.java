package com.education.eduAPI.repository;

import com.education.eduAPI.entity.Course;
import com.education.eduAPI.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Integer> {

    List<Course> findByUsers(User user);

    Course findCourseByCourseName(String courseName);

    Page<Course> findAll(Pageable pageable);

    List<Course> findAllByCourseNameIn(List<String> courseNames);
}
