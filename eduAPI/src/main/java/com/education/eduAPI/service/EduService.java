package com.education.eduAPI.service;

import com.education.eduAPI.dto.PasswordDTO;
import com.education.eduAPI.dto.ProgressDTO;
import com.education.eduAPI.dto.SectionDTO;
import com.education.eduAPI.dto.UserDTO;

import java.util.List;

public interface EduService {



    String verify(UserDTO userDTO);

    UserDTO createUserUsingDTO(UserDTO userDTO);

    String deleteUserById(UserDTO userDTO);

    List<UserDTO> getAllUsers();

    UserDTO getUserById(int id);

    UserDTO updateUser(UserDTO userDTO);

    UserDTO getUserByEmail();

    UserDTO updateUserProfile(UserDTO userDTO);

    Boolean changePassword(PasswordDTO passwordDTO);

    Boolean checkPassword(PasswordDTO passwordDTO);

    UserDTO enrolUser(String courseName);

    boolean sectionCompletion(ProgressDTO progressDTO);

    List<SectionDTO> getAllSections();


//    User createUser(User user);
//
//    List<User> findAllUsers();
//
//    List<Course> findAllCourses();
//
//    User findUserById(int id);
//
//    Course findCourseById(int id);
//
//    Object findUserNameById(int id);
//
//    String associateUserToCourseById(int userId, int courseId);
//
//    List<User> findByCourse(int c);
//
//    List<Course> findByUser(int s);


}
