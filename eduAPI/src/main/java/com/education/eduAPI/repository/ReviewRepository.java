package com.education.eduAPI.repository;

import com.education.eduAPI.entity.Course;
import com.education.eduAPI.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review,Integer> {

    List<Review> findByCourse(Course course);
}
