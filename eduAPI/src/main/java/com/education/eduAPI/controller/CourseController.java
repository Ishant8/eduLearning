package com.education.eduAPI.controller;


import com.education.eduAPI.dto.CourseDTO;
import com.education.eduAPI.service.CourseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/course")
public class CourseController {

    CourseService courseService;

    public CourseController(CourseService courseService){
        this.courseService = courseService;
    }

    @PostMapping("/create")
    public CourseDTO createCourse(@RequestBody CourseDTO courseDTO){
        return courseService.createCourseUsingDto(courseDTO);
    }

    @DeleteMapping("/delete")
    public String deleteCourse(@RequestBody CourseDTO courseDTO){
        return courseService.deleteCourseById(courseDTO);
    }

    @GetMapping("/get")
    public List<CourseDTO> getAllCourses(@RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "10") int size){
         return courseService.getAllCourses(page,size);
    }

    @GetMapping("/get/{id}")
        public CourseDTO findCourseById(@PathVariable int id)
    {
         return courseService.getCourseById(id);
    }

    @PutMapping("/update")
    public CourseDTO updateCourse(@RequestBody CourseDTO courseDTO){
        return courseService.updateCourse(courseDTO);
    }




}
