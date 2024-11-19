package com.education.eduAPI.controller;


import com.education.eduAPI.dto.CategoryListDTO;
import com.education.eduAPI.dto.CourseDTO;
import com.education.eduAPI.dto.SectionDTO;
import com.education.eduAPI.dto.SectionsWrapper;
import com.education.eduAPI.enums.Level;
import com.education.eduAPI.service.CourseService;
import com.education.eduAPI.service.SectionService;
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
    private SectionService sectionService;

    public CourseController(CourseService courseService, ObjectMapper jacksonObjectMapper, SectionService sectionService){
        this.courseService = courseService;
        this.jacksonObjectMapper = jacksonObjectMapper;
        this.sectionService = sectionService;
    }

    @PostMapping("/create")
    public CourseDTO createCourse(@RequestParam("imageData") MultipartFile file,
                                  @RequestParam("instructorData") String instructorData,
                                  @RequestParam("sections") String sectionData) throws IOException {

        CourseDTO courseDTO = jacksonObjectMapper.readValue(instructorData, CourseDTO.class);
        courseDTO.setImageData(file);

        SectionsWrapper sectionsWrapper = jacksonObjectMapper.readValue(sectionData, SectionsWrapper.class);
        List<SectionDTO> sectionDTOList = sectionsWrapper.getSectionList();

        System.out.println(sectionsWrapper.getSectionList());

//        jacksonObjectMapper.readValue(sectionData);

        CourseDTO savedCourseDTO = courseService.createCourseUsingDto(courseDTO,sectionDTOList);

        List<SectionDTO> sectionDTOS = sectionService.addSectionList(sectionDTOList,savedCourseDTO.getCourseName());

        return savedCourseDTO;
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
    public CourseDTO updateCourse(@RequestParam(value = "imageData", required = false) MultipartFile file,
                                  @RequestParam("instructorData") String instructorData,
                                  @RequestParam("sections") String sectionData,
                                  @RequestParam("deletedSections") String deletedSections,
                                  @RequestParam("deletedSubSections") String deletedSubSections) throws IOException {
        CourseDTO courseDTO = jacksonObjectMapper.readValue(instructorData, CourseDTO.class);

        courseDTO.setImageData(file);

        CourseDTO savedCourseDTO = courseService.updateCourse(courseDTO);

        SectionsWrapper sectionsWrapper = jacksonObjectMapper.readValue(sectionData, SectionsWrapper.class);
        List<SectionDTO> sectionDTOList = sectionsWrapper.getSectionList();


        System.out.println("deletedSections" + deletedSections);
        System.out.println("deletedSubSections" + deletedSubSections);

        List<SectionDTO> sectionDTOS = sectionService.updateSectionList(sectionDTOList,savedCourseDTO.getCourseName(),deletedSections,deletedSubSections);



        return savedCourseDTO;
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

    @GetMapping("/levels")
    public List<Level> findAllLevels(){
        return List.of(Level.values());
    }



}

