package com.education.eduAPI.service;

import com.education.eduAPI.dto.CourseDTO;
import com.education.eduAPI.entity.Category;
import com.education.eduAPI.entity.Course;
import com.education.eduAPI.entity.Image;
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

import java.io.File;
import java.io.IOException;
import java.time.Instant;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;


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
    public CourseDTO createCourseUsingDto(CourseDTO courseDTO ) throws IOException {

        Course course = courseMapper.toEntity(courseDTO);

        course = courseRepository.save(course);

        courseDTO.getImageData().transferTo(new File(course.getCoverImage().getFilePath()));
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
    public CourseDTO updateCourse(CourseDTO courseDTO) throws IOException {
        Course course = courseRepository.findById(courseDTO.getCourseId()).orElseThrow(() -> new CustomEntityNotFoundException("Requested Course Not Found."));
//        Course course = courseMapper.toEntity(courseDTO);
        course.setCourseName(courseDTO.getCourseName());
        course.setCourseDescription(courseDTO.getCourseDescription());
        course.setHours(courseDTO.getHours());
        course.setSections(courseDTO.getSections());
        course.setPrice(courseDTO.getPrice());
//        course.setCreateDate(courseDTO.getCreateDate());
        course.setLevel(courseDTO.getLevel());

        if(courseDTO.getCategoryName() != null) {
            Category category = categoryRepository.findByCategoryName(courseDTO.getCategoryName());
//            System.out.println(category);
            if (category != null) {
                course.setCategory(category);
            }
        }

        if(courseDTO.getImageData() != null) {
            String FILE_PATH = "/home/anant/Projects/eduLearning/eduFrontend/public/images/common/";
            String[] fileNames = Objects.requireNonNull(courseDTO.getImageData().getOriginalFilename()).split("\\.");
            System.out.println(Arrays.toString(fileNames));

            String fileName = fileNames[0] + "_" + Instant.now().getEpochSecond() + "." + fileNames[fileNames.length - 1];
            String filePath = FILE_PATH + fileName;

            Image image = new Image();


            image.setName(fileName);
            image.setType(courseDTO.getImageData().getContentType());
            image.setFilePath(filePath);

            course.setCoverImage(image);
        }


        course = courseRepository.save(course);

        courseDTO.getImageData().transferTo(new File(course.getCoverImage().getFilePath()));

        return courseMapper.toDto(course);
//        return new CourseDTO();
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
    public List<CourseDTO> findAllCoursesByCategoryAndLevel(List<Category> categories, List<Level> levels, int page, int size) {

        List<Category> persistentCategories = categories.stream().map((category)->{
            return categoryRepository.findByCategoryName(category.getCategoryName());
        }).toList();

        PageRequest pageRequest = PageRequest.of(page,size);

        return courseRepository.findAllByCategoryInAndLevelInOrderByCourseId(persistentCategories, levels,pageRequest).stream().map(c -> courseMapper.toDto(c)).toList();

    }

    @Override
    public List<CourseDTO> findAllCoursesByCourseNameOrInstructor(String searchItem) {
        PageRequest pageRequest = PageRequest.of(0, 10);
        List<Course> courses = courseRepository.findByCourseNameAndInstructor(searchItem,pageRequest);
        return courses.stream().map(c-> courseMapper.toDto(c)).toList();
    }

    @Override
    public List<CourseDTO> findAllCoursesByInstructor(String instructorEmail) {
        return courseRepository.findAllByInstructorEmail(instructorEmail).stream().map(c-> courseMapper.toDto(c)).toList();
    }

}
