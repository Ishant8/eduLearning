package com.education.eduAPI.service;

import com.education.eduAPI.dto.ReviewDTO;
import com.education.eduAPI.entity.Course;
import com.education.eduAPI.entity.Review;
import com.education.eduAPI.entity.User;
import com.education.eduAPI.exception.CustomEntityNotFoundException;
import com.education.eduAPI.mapper.ReviewMapper;
import com.education.eduAPI.repository.CourseRepository;
import com.education.eduAPI.repository.ReviewRepository;
import com.education.eduAPI.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    ReviewRepository reviewRepository;
    ReviewMapper reviewMapper;

    public ReviewServiceImpl(ReviewRepository reviewRepository, ReviewMapper reviewMapper, CourseRepository courseRepository, UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.reviewMapper = reviewMapper;
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
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

    @Override
    public String addReview(ReviewDTO reviewDTO) {

        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = userDetails.getUsername();

        User user = userRepository.findUserByEmail(username);
        Course course = courseRepository.findCourseByCourseName(reviewDTO.getCourseName());

        if(course.getUsers().contains(user))
        {
            Review review = new Review(reviewDTO.getComment(), reviewDTO.getRating());
            review.setUser(user);
            review.setCourse(course);
            return reviewMapper.toDto(reviewRepository.save(review)).toString();
        }

        return "User not Enrolled";

    }

    @Override
    public String updateReview(ReviewDTO reviewDTO) {

        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = userDetails.getUsername();

        User user = userRepository.findUserByEmail(username);
        Course course = courseRepository.findCourseByCourseName(reviewDTO.getCourseName());

        Review review = reviewRepository.findByCourseAndUser(course, user).get(0);

        review.setComment(reviewDTO.getComment());
        review.setRating(reviewDTO.getRating());
        return reviewMapper.toDto(reviewRepository.save(review)).toString();
    }

    @Override
    public List<ReviewDTO> uniqueReviews() {

        List<Review> uniqueReviews = new ArrayList<>();
        reviewRepository.findAll()
                .forEach((review)->{
                    if(uniqueReviews.isEmpty())
                            uniqueReviews.add(review);
                    else if(!uniqueReviews.stream()
                                .map((uniqueReview)->uniqueReview.getUser().getUserId())
                                .toList()
                                .contains(review.getUser().getUserId()) &&
                        !uniqueReviews.stream()
                                .map((uniqueReview)->uniqueReview.getCourse().getCourseId())
                                .toList()
                                .contains(review.getCourse().getCourseId())
                    )
                    {
                        uniqueReviews.add(review);
                    }
        });

        return uniqueReviews.stream().map(rv -> reviewMapper.toDto(rv)).toList();
    }


}
