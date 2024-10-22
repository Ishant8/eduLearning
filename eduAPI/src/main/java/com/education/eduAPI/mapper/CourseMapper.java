package com.education.eduAPI.mapper;

import com.education.eduAPI.dto.CourseDTO;
import com.education.eduAPI.entity.Category;
import com.education.eduAPI.entity.Course;
import com.education.eduAPI.entity.Image;
import com.education.eduAPI.entity.User;
import com.education.eduAPI.repository.CategoryRepository;
import com.education.eduAPI.repository.UserRepository;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.time.Instant;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
public class CourseMapper {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final ReviewMapper reviewMapper;

    public CourseMapper(UserRepository userRepository, CategoryRepository categoryRepository, ReviewMapper reviewMapper) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.reviewMapper = reviewMapper;
    }

    public CourseDTO toDto(Course course){

        System.out.println("In Course Mapper toDto");

        CourseDTO courseDTO = new CourseDTO();
        courseDTO.setCourseId(course.getCourseId());
        courseDTO.setCourseName(course.getCourseName());
        courseDTO.setCategoryName(course.getCategory().getCategoryName());
        courseDTO.setCourseDescription(course.getCourseDescription());
        courseDTO.setHours(course.getHours());
        courseDTO.setSections(course.getSections());
        courseDTO.setPrice(course.getPrice());
        courseDTO.setLevel(course.getLevel());
        courseDTO.setInstructorEmail(course.getInstructorEmail());


        if(course.getCoverImage() != null)
        {
            String filePath = course.getCoverImage().getFilePath();
            try {

                byte[] image = Files.readAllBytes(new File(filePath).toPath());
                String base64Image = Base64.getEncoder().encodeToString(image);
                courseDTO.setCoverImage(base64Image);

            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        else courseDTO.setCoverImage(null);

        courseDTO.setCreateDate(course.getCreateDate());
        courseDTO.setUpdateDate(course.getUpdateDate());
        courseDTO.setImageData(null);
        Map<Integer, String> instructorDetails = course.getUsers()==null ? null : course.getUsers().stream()
              .filter(user -> user.getEmail().equals(course.getInstructorEmail()))
              .collect(Collectors.toMap(User::getUserId, user -> user.getFirstName() + " " + user.getLastName()));


        if(instructorDetails != null)
        {
            if (course.getUsers().get(0).getProfileImage() != null) {
                String profileFilePath = course.getUsers().get(0).getProfileImage().getFilePath();
                try {

                    byte[] image = Files.readAllBytes(new File(profileFilePath).toPath());
                    String base64Image = Base64.getEncoder().encodeToString(image);
                    courseDTO.setProfileImage(base64Image);

                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            } else courseDTO.setProfileImage(null);
        }else courseDTO.setProfileImage(null);

        courseDTO.setInstructorDetails(instructorDetails);
        courseDTO.setReviews(course.getReviews() != null?course.getReviews().stream().map(reviewMapper::toDto).toList():null);

        return courseDTO;

    }

    public Course toEntity(CourseDTO courseDTO){
        Course course = new Course();
        course.setCourseId(courseDTO.getCourseId());
        course.setCourseName(courseDTO.getCourseName());
        course.setCourseDescription(courseDTO.getCourseDescription());
        course.setHours(courseDTO.getHours());
        course.setSections(courseDTO.getSections());
        course.setPrice(courseDTO.getPrice());
        course.setLevel(courseDTO.getLevel());
//        course.setCoverImage(courseDTO.getCoverImage());
        course.setCreateDate(courseDTO.getCreateDate());
        course.setUpdateDate(courseDTO.getUpdateDate());

        System.out.println(courseDTO.getCourseDescription());
//        courseDTO.getCategoryName();
        if(courseDTO.getCategoryName() != null)
        {
            Category category = categoryRepository.findByCategoryName(courseDTO.getCategoryName());
//            System.out.println(category);
            if(category != null) {
                course.setCategory(category);
            }
            else {

            }
        }

        if(courseDTO.getInstructorDetails() != null && !courseDTO.getInstructorDetails().isEmpty())
        {
            List<User> users = userRepository.findAllByUserIdIn(courseDTO.getInstructorDetails().keySet().stream().toList());
            course.setUsers(users);
        }else{
            course.setUsers(null);
        }

        course.setInstructorEmail(course.getUsers().get(0).getEmail());

        String FILE_PATH = "/home/ishant/Projects/EduLearning/eduFrontend/public/images/common/";
        String[] fileNames = Objects.requireNonNull(courseDTO.getImageData().getOriginalFilename()).split("\\.");
        String fileName =fileNames[0]+ "_" + Instant.now().getEpochSecond()+"."+fileNames[1];
        String filePath = FILE_PATH + fileName;

        Image image = new Image();


        image.setName(fileName);
        image.setType(courseDTO.getImageData().getContentType());
        image.setFilePath(filePath);

        course.setCoverImage(image);

        return course;
    }
}
