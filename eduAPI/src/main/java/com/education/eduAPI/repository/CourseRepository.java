package com.education.eduAPI.repository;

import com.education.eduAPI.entity.Category;
import com.education.eduAPI.entity.Course;
import com.education.eduAPI.entity.User;
import com.education.eduAPI.enums.Level;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Integer> {

    List<Course> findByUsers(User user);

    Course findCourseByCourseName(String courseName);

    Page<Course> findAll(Pageable pageable);

    List<Course> findAllByCourseNameIn(List<String> courseNames);

    List<Course> findAllByCategoryAndUsersNotContaining(Category category, User user);


//    List<Course> findAllByCategoryInAndLevelIn(List<Category> categories, List<Level> levels);
    Page<Course> findAllByCategoryInAndLevelInOrderByCourseId(List<Category> categories, List<Level> levels,Pageable pageable);


    @Query("SELECT c FROM Course c JOIN c.users u JOIN u.role r " +
            "WHERE (LOWER(c.courseName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
            "OR LOWER(u.firstName) LIKE LOWER(CONCAT(:searchTerm, '%')) " +
            "OR LOWER(u.lastName) LIKE LOWER(CONCAT(:searchTerm, '%'))) " +
            "AND r.role = 'ROLE_ADMIN'")
    List<Course> findByCourseNameAndInstructor(@Param("searchTerm") String searchTerm);
}
