package com.education.eduAPI.repository;

import com.education.eduAPI.entity.Course;
import com.education.eduAPI.entity.Review;
import com.education.eduAPI.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review,Integer> {

    List<Review> findByCourse(Course course);

    List<Review> findByCourseAndUser(Course course, User user);

    @Transactional
    void deleteAllByUser(User user);
}
