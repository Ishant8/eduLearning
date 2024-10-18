package com.education.eduAPI.service;

import com.education.eduAPI.dto.CourseDTO;
import com.education.eduAPI.entity.Category;
import com.education.eduAPI.entity.Course;
import com.education.eduAPI.entity.User;
import com.education.eduAPI.enums.Level;
import com.education.eduAPI.exception.CustomEntityNotFoundException;
import com.education.eduAPI.mapper.CourseMapper;
import com.education.eduAPI.mapper.UserMapper;
import com.education.eduAPI.repository.CategoryRepository;
import com.education.eduAPI.repository.CourseRepository;
import com.education.eduAPI.repository.UserRepository;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CourseServiceImpl implements CourseService {

    private final UserRepository userRepository;
    CourseRepository courseRepository;
    CategoryRepository categoryRepository;

    CourseMapper courseMapper;

    public CourseServiceImpl(UserRepository userRepository, EntityManager entityManager, CourseRepository courseRepository, UserMapper userMapper, CourseMapper courseMapper, CategoryRepository categoryRepository) {
         this.courseRepository = courseRepository;
        this.courseMapper = courseMapper;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
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

    @Override
    public List<CourseDTO> findCoursesByCategoryExcludingUser(String categoryName) {

        Category category = categoryRepository.findByCategoryName(categoryName);

        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = userDetails.getUsername();
        User user = userRepository.findUserByEmail(username);

        List<CourseDTO> listCourses = courseRepository.findAllByCategoryAndUsersNotContaining(category, user).stream().map(c-> courseMapper.toDto(c)).toList();

        return listCourses;
    }

    @Override
    public List<CourseDTO> findCoursesByUser() {

        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = userDetails.getUsername();
        User user = userRepository.findUserByEmail(username);

        return courseRepository.findByUsers(user).stream().map(c-> courseMapper.toDto(c)).toList();

    }

    @Override
    public List<CourseDTO> findAllCoursesByCategoryAndLevel(List<Category> categories, List<Level> levels) {

        List<Category> persistentCategories = categories.stream().map((category)->{
            return categoryRepository.findByCategoryName(category.getCategoryName());
        }).toList();

        return courseRepository.findAllByCategoryInAndLevelIn(persistentCategories, levels).stream().map(c -> courseMapper.toDto(c)).toList();

    }

}
