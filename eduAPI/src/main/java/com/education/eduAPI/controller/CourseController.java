package com.education.eduAPI.controller;


import com.education.eduAPI.dto.CategoryListDTO;
import com.education.eduAPI.dto.CourseDTO;
import com.education.eduAPI.service.CourseService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/course")
public class CourseController {

    private final ObjectMapper jacksonObjectMapper;
    CourseService courseService;

    public CourseController(CourseService courseService, ObjectMapper jacksonObjectMapper){
        this.courseService = courseService;
        this.jacksonObjectMapper = jacksonObjectMapper;
    }

    @PostMapping("/create")
    public CourseDTO createCourse(@RequestParam("imageData") MultipartFile file, @RequestParam("instructorData") String instructorData) throws IOException {

        CourseDTO courseDTO = jacksonObjectMapper.readValue(instructorData, CourseDTO.class);
        courseDTO.setImageData(file);

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

    @GetMapping("/notenrolled/{categoryName}")
    public List<CourseDTO> findCourseByCategoryId(@PathVariable String categoryName){
        return courseService.findCoursesByCategoryExcludingUser(categoryName);
    }

    @GetMapping("/user")
    public List<CourseDTO> findCourseByUser(){
        return courseService.findCoursesByUser();
    }

    @PostMapping("/filter")
    public List<CourseDTO> findFilteredCourses(@RequestBody CategoryListDTO categoriesList){

        System.out.println("------------------------------"+categoriesList+"----"+categoriesList.getLevelList());

        return courseService.findAllCoursesByCategoryAndLevel(categoriesList.getCategoriesList(), categoriesList.getLevelList());
    }

    @GetMapping("/search")
    public List<CourseDTO> findCourseBySearch(@RequestParam("search") String keyword){
        return courseService.findAllCoursesByCourseNameOrInstructor(keyword);
    }




}
