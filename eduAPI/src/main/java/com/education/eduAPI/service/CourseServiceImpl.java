package com.education.eduAPI.service;

import com.education.eduAPI.dto.CourseDTO;
import com.education.eduAPI.entity.Course;
import com.education.eduAPI.exception.CustomEntityNotFoundException;
import com.education.eduAPI.mapper.CourseMapper;
import com.education.eduAPI.mapper.UserMapper;
import com.education.eduAPI.repository.CourseRepository;
import com.education.eduAPI.repository.UserRepository;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CourseServiceImpl implements CourseService {

    CourseRepository courseRepository;

    CourseMapper courseMapper;

    public CourseServiceImpl(UserRepository userRepository, EntityManager entityManager, CourseRepository courseRepository, UserMapper userMapper, CourseMapper courseMapper) {
         this.courseRepository = courseRepository;
        this.courseMapper = courseMapper;
    }

    @Override
    public CourseDTO createCourseUsingDto(CourseDTO courseDTO) {

        Course course = courseMapper.toEntity(courseDTO);
        course = courseRepository.save(course);
//        System.out.println(courseRepository.save(course));

        return courseMapper.toDto(course);
    }

    @Override
    public String deleteCourseById(CourseDTO courseDTO) {

        courseRepository.deleteById(courseDTO.getCourseId());

        return "Course with id " + courseDTO.getCourseId() + " has been deleted";
    }

    @Override
    public List<CourseDTO> getAllCourses(int page, int size) {

        PageRequest pageRequest = PageRequest.of(page,size);
        return courseRepository.findAll(pageRequest).stream().map(cs -> courseMapper.toDto(cs)).toList();
    }

    @Override
    public CourseDTO getCourseById(int id) {

        System.out.println("Before COurse");
        Course course = courseRepository.findById(id).orElseThrow(() -> new CustomEntityNotFoundException("Requested Course Not Found."));
        System.out.println("After COurse");
        return courseMapper.toDto(course);
    }

    @Override
    public CourseDTO updateCourse(CourseDTO courseDTO) {

        Course course = courseMapper.toEntity(courseDTO);

        course = courseRepository.save(course);

        return courseMapper.toDto(course);
    }

}
