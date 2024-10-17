package com.education.eduAPI.service;

import com.education.eduAPI.entity.CustomUserDetails;
import com.education.eduAPI.entity.User;
import com.education.eduAPI.mapper.UserMapper;
import com.education.eduAPI.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    private UserMapper userMapper;


    @Override
    public UserDetails loadUserByUsername(String username) {

//        System.out.println("Hello");
        User user = userRepository.findUserByEmail(username);


//        System.out.println(user.getEmail());
//        System.out.println(user.getPassword());
////        userDTO.getCourses().forEach(course -> {System.out.println(course.getCourseName());});
//        System.out.println(user);
//        System.out.println(user.getCourses());
//        System.out.println("Bye");


        return new CustomUserDetails(userMapper.toDTO(user));
    }
}
