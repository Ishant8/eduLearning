package com.education.eduAPI.controller;


import com.education.eduAPI.dto.CategoryListDTO;
import com.education.eduAPI.dto.CourseDTO;
import com.education.eduAPI.service.CourseService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/course")
public class CourseController {

    private static final Logger log = LoggerFactory.getLogger(CourseController.class);
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
    public List<CourseDTO> getAllCourses(@RequestParam(defaultValue = "0") int page,
                                         @RequestParam(defaultValue = ""+Integer.MAX_VALUE) int size){
         return courseService.getAllCourses(page,size);
    }

    @GetMapping("/get/{id}")
        public CourseDTO findCourseById(@PathVariable int id)
    {
         return courseService.getCourseById(id);
    }

    @PutMapping("/update")
    public CourseDTO updateCourse(@RequestParam(value = "imageData", required = false) MultipartFile file, @RequestParam("instructorData") String instructorData) throws IOException {
        CourseDTO courseDTO = jacksonObjectMapper.readValue(instructorData, CourseDTO.class);
//        System.out.println(file);
        courseDTO.setImageData(file);
//        System.out.println(file);
        return courseService.updateCourse(courseDTO);

//        return courseService.createCourseUsingDto(courseDTO);
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
    public List<CourseDTO> findFilteredCourses(@RequestBody CategoryListDTO categoriesList,
                                               @RequestParam(defaultValue = "0") int page,
                                               @RequestParam(defaultValue = ""+Integer.MAX_VALUE) int size){

        System.out.println("------------------------------"+categoriesList+"----"+categoriesList.getLevelList());

        return courseService.findAllCoursesByCategoryAndLevel(categoriesList.getCategoriesList(), categoriesList.getLevelList(),page,size);
    }

    @PostMapping("/size")
    public Integer findAllCourses(@RequestBody CategoryListDTO categoriesList){


        return courseService.findAllCoursesByCategoryAndLevel(categoriesList.getCategoriesList(), categoriesList.getLevelList(),0, Integer.MAX_VALUE).size();

    }

    @GetMapping("/search")
    public List<CourseDTO> findCourseBySearch(@RequestParam("search") String keyword){
        return courseService.findAllCoursesByCourseNameOrInstructor(keyword);
    }

    @GetMapping("/instructor")
    public List<CourseDTO> findCourseByInstructor(@RequestParam("instructor") String instructor){
        return courseService.findAllCoursesByInstructor(instructor);
    }




}
