package com.education.eduAPI.mapper;

import com.education.eduAPI.dto.ReviewDTO;
import com.education.eduAPI.entity.Course;
import com.education.eduAPI.entity.Review;
import com.education.eduAPI.entity.User;
import com.education.eduAPI.repository.CourseRepository;
import com.education.eduAPI.repository.UserRepository;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Base64;

@Component
public class ReviewMapper {

     CourseRepository courseRepository;
     UserRepository userRepository;

    public ReviewMapper(CourseRepository courseRepository, UserRepository userRepository){
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
    }

    public ReviewDTO toDto(Review review){
        ReviewDTO reviewDto = new ReviewDTO();
        reviewDto.setReviewId(review.getId());
        reviewDto.setComment(review.getComment());
        reviewDto.setRating(review.getRating());

        if(review.getUser() != null)
        {
            reviewDto.setUserName(review.getUser().getFirstName()+" "+review.getUser().getLastName());

            if(review.getUser().getProfileImage() != null)
            {
                String filePath = review.getUser().getProfileImage().getFilePath();
                try {

                    byte[] image = Files.readAllBytes(new File(filePath).toPath());
                    String base64Image = Base64.getEncoder().encodeToString(image);
                    reviewDto.setProfileImage(base64Image);

                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
            else reviewDto.setProfileImage(null);
        }

        if(review.getCourse() != null)
        {
            reviewDto.setCourseId(review.getCourse().getCourseId());
            reviewDto.setCourseName(review.getCourse().getCourseName());
        }

        return reviewDto;
    }

    public Review toEntity(ReviewDTO reviewDTO){
        Review review = new Review();
        review.setComment(reviewDTO.getComment());
        review.setId(reviewDTO.getReviewId());
        review.setRating(reviewDTO.getRating());

        if(reviewDTO.getUserId() != 0)
        {
            User user = userRepository.findById(reviewDTO.getUserId()).orElse(null);
            review.setUser(user);
        }

        if(reviewDTO.getCourseId() != 0)
        {
            Course course = courseRepository.findById(reviewDTO.getCourseId()).orElse(null);
            review.setCourse(course);

        }

        return review;

    }



}
