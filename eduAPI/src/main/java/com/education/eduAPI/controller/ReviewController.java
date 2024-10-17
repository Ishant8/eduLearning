package com.education.eduAPI.controller;


import com.education.eduAPI.dto.CourseDTO;
import com.education.eduAPI.dto.ReviewDTO;
import com.education.eduAPI.service.CourseService;
import com.education.eduAPI.service.ReviewService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/review")
public class ReviewController {

    ReviewService reviewService;

    public ReviewController(ReviewService reviewService){
        this.reviewService = reviewService;
    }

    @GetMapping("/get/{id}")
    public ReviewDTO findReviewById(@PathVariable int id)
    {
         return reviewService.getReviewById(id);
    }

    @GetMapping("/get")
    public List<ReviewDTO> findAllReviews(){
        return reviewService.getAllReviews();
    }

    @GetMapping("/get/course/{id}")
    public List<ReviewDTO> findAllReviewsByCourseId(@PathVariable int id){
        return reviewService.getAllReviewsByCourseId(id);
    }

    @PostMapping("/create")
    public ReviewDTO createReview(@RequestBody ReviewDTO reviewDTO)
    {
        return reviewService.createReview(reviewDTO);
    }

}
