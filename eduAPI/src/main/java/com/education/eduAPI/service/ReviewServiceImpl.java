package com.education.eduAPI.service;

import com.education.eduAPI.dto.ReviewDTO;
import com.education.eduAPI.entity.Course;
import com.education.eduAPI.entity.Review;
import com.education.eduAPI.exception.CustomEntityNotFoundException;
import com.education.eduAPI.mapper.ReviewMapper;
import com.education.eduAPI.repository.CourseRepository;
import com.education.eduAPI.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    private final CourseRepository courseRepository;
    ReviewRepository reviewRepository;
    ReviewMapper reviewMapper;

    public ReviewServiceImpl(ReviewRepository reviewRepository, ReviewMapper reviewMapper, CourseRepository courseRepository) {
        this.reviewRepository = reviewRepository;
        this.reviewMapper = reviewMapper;
        this.courseRepository = courseRepository;
    }

    @Override
    public ReviewDTO getReviewById(int id) {

        Review review = reviewRepository.findById(id).orElseThrow(() -> new CustomEntityNotFoundException("No Review for Given ID."));

        return reviewMapper.toDto(review);
    }

    @Override
    public ReviewDTO createReview(ReviewDTO reviewDTO) {



        Review review = reviewMapper.toEntity(reviewDTO);
        review = reviewRepository.save(review);

        return reviewMapper.toDto(review);
    }

    @Override
    public List<ReviewDTO> getAllReviews() {

        return reviewRepository.findAll().stream().map(rv -> reviewMapper.toDto(rv)).toList();
    }

    @Override
    public List<ReviewDTO> getAllReviewsByCourseId(int id) {
        Course course = courseRepository.findById(id).orElseThrow(() -> new CustomEntityNotFoundException("No Reviews for Given Course."));

        return reviewRepository.findByCourse(course).stream().map(rv -> reviewMapper.toDto(rv)).toList();
    }
}
