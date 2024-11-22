package com.education.eduAPI.service;

import com.education.eduAPI.dto.ReviewDTO;
import com.education.eduAPI.entity.Course;
import com.education.eduAPI.entity.Review;

import java.util.List;

public interface ReviewService {

    ReviewDTO getReviewById(int id);

    ReviewDTO createReview(ReviewDTO reviewDTO);

    List<ReviewDTO> getAllReviews();

    List<ReviewDTO> getAllReviewsByCourseId(int id);

    String addReview(ReviewDTO reviewDTO);

    String updateReview(ReviewDTO reviewDTO);

    List<ReviewDTO> uniqueReviews();

    List<Review> removeUser(Course course);

    void deleteReviews(int courseId);


}
