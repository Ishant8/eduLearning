package com.education.eduAPI.service;

import com.education.eduAPI.dto.PasswordDTO;
import com.education.eduAPI.dto.ProgressDTO;
import com.education.eduAPI.dto.SectionDTO;
import com.education.eduAPI.dto.UserDTO;
import com.education.eduAPI.entity.Course;
import com.education.eduAPI.entity.JwtToken;
import com.education.eduAPI.entity.Section;
import com.education.eduAPI.entity.User;
import com.education.eduAPI.exception.CustomEntityNotFoundException;
import com.education.eduAPI.mapper.CourseMapper;
import com.education.eduAPI.mapper.SectionMapper;
import com.education.eduAPI.mapper.UserMapper;
import com.education.eduAPI.repository.CourseRepository;
import com.education.eduAPI.repository.ReviewRepository;
import com.education.eduAPI.repository.SectionRepository;
import com.education.eduAPI.repository.UserRepository;
import jakarta.persistence.EntityManager;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EduServiceImpl implements EduService{

    private final SectionRepository sectionRepository;
    private final SectionMapper sectionMapper;
    private final ReviewRepository reviewRepository;
    UserRepository userRepository;
    CourseRepository courseRepository;
    EntityManager entityManager;
    JWTService jwtService;

    UserMapper userMapper;
    CourseMapper courseMapper;

    AuthenticationManager authManager;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public EduServiceImpl(JWTService jwtService, AuthenticationManager authManager, UserRepository userRepository, EntityManager entityManager, CourseRepository courseRepository, UserMapper userMapper, CourseMapper courseMapper, SectionRepository sectionRepository, SectionMapper sectionMapper, ReviewRepository reviewRepository){
        this.userRepository = userRepository;
        this.entityManager = entityManager;
        this.courseRepository = courseRepository;
        this.userMapper = userMapper;
        this.courseMapper = courseMapper;
        this.authManager = authManager;
        this.jwtService = jwtService;
        this.sectionRepository = sectionRepository;
        this.sectionMapper = sectionMapper;
        this.reviewRepository = reviewRepository;
    }


    @Override
    public String verify(UserDTO userDTO) {

        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(userDTO.getEmail(), userDTO.getPassword()));

        if(authentication.isAuthenticated()){
            return new JwtToken(jwtService.generateToken(10,userDTO.getEmail())).getToken() ;
        }else {
            return "Fail";
        }
    }

    @Override
    public UserDTO createUserUsingDTO(UserDTO userDTO) {

        User user = userMapper.toEntity(userDTO);
        user = userRepository.save(user);

        return userMapper.toDTO(user);
    }


    @Override
    public String deleteUserById(int userId) {

        User user = userRepository.findById(userId).orElseThrow(() -> new CustomEntityNotFoundException("User not found"));

//        reviewRepository.deleteAllByUser(user);

//        user.setProfileImage(null);
//        User user2 = userRepository.save(user);

        userRepository.delete(user);

        return "User with id " + userId + " has been deleted";
    }

    @Override
    public List<UserDTO> getAllUsers() {

        return userRepository.findAll().stream().map(us -> userMapper.toDTO(us)).toList();
    }

    @Override
    public UserDTO getUserById(int id) {

        User user = userRepository.findById(id).orElseThrow(() -> new CustomEntityNotFoundException("No User with Given ID Exists"));
        return userMapper.toDTO(user);
    }

    @Override
    public UserDTO updateUser(UserDTO userDTO) {

        User user = userMapper.toEntity(userDTO);

        user = userRepository.save(user);

        return userMapper.toDTO(user);
    }

    @Override
    public UserDTO getUserByEmail() {

        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = userDetails.getUsername();

        User user;
        try {
             user = userRepository.findUserByEmail(email);
        }catch(Exception e){
            throw new CustomEntityNotFoundException("No Such user with provided email");
        }

        return userMapper.toDTO(user);
    }

    @Override
    public UserDTO updateUserProfile(UserDTO userDTO) {

        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = userDetails.getUsername();

        User user;
        try {
            user = userRepository.findUserByEmail(email);
        }catch(Exception e){
            throw new CustomEntityNotFoundException("No Such user with provided email");
        }

        System.out.println(userDTO);

        if(userDTO.getFirstName() != null) user.setFirstName(userDTO.getFirstName());
        if(userDTO.getLastName() != null) user.setLastName(userDTO.getLastName());
        if(userDTO.getEmail() != null) user.setEmail(userDTO.getEmail());

        userRepository.save(user);

        return userMapper.toDTO(user);
    }


    @Override
    public Boolean changePassword(PasswordDTO passwordDTO) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String password = userDetails.getPassword();
        String username = userDetails.getUsername();

        if(encoder.matches(passwordDTO.getOldPassword(),password)){
            User user = userRepository.findUserByEmail(username);
            System.out.println(user);
            user.setPassword(encoder.encode(passwordDTO.getNewPassword()));
            userRepository.save(user);

            return true;
        }

        return false;
    }

    @Override
    public Boolean checkPassword(PasswordDTO passwordDTO) {

        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String password = userDetails.getPassword();

        return encoder.matches(passwordDTO.getOldPassword(),password);
    }

    @Override
    public UserDTO enrolUser(String courseName) {

        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = userDetails.getUsername();

        User user = userRepository.findUserByEmail(email);
        Course course = courseRepository.findCourseByCourseName(courseName);
        List<Course> existingCourses = user.getCourses();
        existingCourses.add(course);

        user.setCourses(existingCourses);
        System.out.println("-----------------------------------------------------------------------------------------------------");



        return userMapper.toDTO(userRepository.save(user));
    }

    @Override
    public boolean sectionCompletion(ProgressDTO progressDTO) {
        User user = userRepository.findById(progressDTO.getUserId()).orElseThrow(() -> new CustomEntityNotFoundException("No User with id " + progressDTO.getUserId()));
        List<Section> existingSections = user.getSections();
        Section section = sectionRepository.findById(progressDTO.getSectionId()).orElse(null);
        existingSections.add(section);
        user.setSections(existingSections);
        user = userRepository.save(user);
        return user.getSections() != null;
    }

    @Override
    public List<SectionDTO> getAllSections() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = userDetails.getUsername();
        User user = userRepository.findUserByEmail(email);
        return user.getSections().stream().map(sectionMapper::toDto).toList();
    }


//    @Override
//    public User createUser(User user) {
//        return userRepository.save(user);
//    }
//
//    @Override
//    public List<User> findAllUsers() {
//
////        User user = userRepository.findById(1).orElse(null);
////        System.out.println(user);
////        entityManager.detach(user);
//
//        return userRepository.findAll();
//    }
//
//    @Override
//    public List<Course> findAllCourses() {
//        return courseRepository.findAll();
//    }
//
//    @Override
//    public User findUserById(int id) {
//        return userRepository.findById(id).orElse(null);
//    }
//
//    @Override
//    public Course findCourseById(int id) {
//        return courseRepository.findById(id).orElse(null);
//    }
//
//    @Override
//    public Object findUserNameById(int id) {
//        return userRepository.findUserById(id);
//    }
//
//    @Override
//    public String associateUserToCourseById(int userId, int courseId) {
//        User user = userRepository.findById(userId).orElseThrow();
//        Course course = courseRepository.findById(courseId).orElseThrow();
//        List<Course> courseList = user.getCourses();
//
//        if(courseList.contains(course)){
//            return "Already Present";
//        }
//
//        user.getCourses().add(course);
//        userRepository.save(user);
//
//        return "saved";
//    }
//
//    @Override
//    public List<User> findByCourse(int c) {
//        Course course = courseRepository.findById(c).orElseThrow();
//
//        return userRepository.findByCourses(course);
//    }
//
//    @Override
//    public List<Course> findByUser(int s) {
//        User user = userRepository.findById(s).orElseThrow();
//
//        return courseRepository.findByUsers(user);
//    }


}
