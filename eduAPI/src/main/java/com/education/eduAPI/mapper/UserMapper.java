package com.education.eduAPI.mapper;

import com.education.eduAPI.dto.UserDTO;
import com.education.eduAPI.entity.Course;
import com.education.eduAPI.entity.Role;
import com.education.eduAPI.entity.User;
import com.education.eduAPI.repository.CourseRepository;
import com.education.eduAPI.repository.RoleRepository;
import com.education.eduAPI.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Base64;
import java.util.List;

@Component
public class UserMapper {

    private final RoleRepository roleRepository;
    private final CourseRepository courseRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public UserMapper(UserRepository userRepository, CourseRepository courseRepository, RoleRepository roleRepository) {
        this.courseRepository = courseRepository;
        this.roleRepository = roleRepository;
    }

    public UserDTO toDTO(User user) {

        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(user.getUserId());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPassword(user.getPassword());
        userDTO.setRole(user.getRole()!=null?user.getRole().getRole():null);

        if(user.getProfileImage() != null)
        {
            String filePath = user.getProfileImage().getFilePath();
            try {

                byte[] image = Files.readAllBytes(new File(filePath).toPath());
                String base64Image = Base64.getEncoder().encodeToString(image);
                userDTO.setProfileImage(base64Image);

            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        else
            userDTO.setProfileImage(null);

        userDTO.setCourseNames(user.getCourses() != null?
                user.getCourses().stream().map(Course::getCourseName).toList()
                :null);
         return userDTO;

    }


    public User toEntity(UserDTO userDTO) {
        User user = new User();
        user.setUserId(userDTO.getUserId());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(encoder.encode(userDTO.getPassword()));

        if (userDTO.getRole() != null) {
            Role role = roleRepository.findByRole(userDTO.getRole());
            user.setRole(role);
        }

        user.setProfileImage(null);

        if (userDTO.getCourseNames() != null && !userDTO.getCourseNames().isEmpty()) {
            List<Course> courses = courseRepository.findAllByCourseNameIn(userDTO.getCourseNames());
            user.setCourses(courses);
        }

        return user;
    }
}