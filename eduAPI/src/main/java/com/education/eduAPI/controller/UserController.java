package com.education.eduAPI.controller;

import com.education.eduAPI.dto.PasswordDTO;
import com.education.eduAPI.dto.UserDTO;
import com.education.eduAPI.exception.CustomErrorResponse;
import com.education.eduAPI.mapper.UserMapper;
import com.education.eduAPI.repository.UserRepository;
import com.education.eduAPI.service.EduService;
import com.education.eduAPI.service.ImageService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.MimeType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    EduService eduService;
    ImageService imageService;


    public UserController(EduService eduService, UserRepository userRepository, UserMapper userMapper, ImageService imageService){
        this.eduService = eduService;
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.imageService = imageService;

    }


    @PostMapping("/login")
    public String login(@RequestBody UserDTO userDTO, HttpServletResponse response){

        String JwtToken = eduService.verify(userDTO);

        if(JwtToken != null)
        {
            Cookie cookie = new Cookie("JwtToken", JwtToken);
            cookie.setPath("/"); // Set the same path as the original cookie
            cookie.setMaxAge(60*30); // Set maxAge to 0 to delete the cookie
            response.addCookie(cookie);

            return JwtToken;
        }

        return "login failed";

//        return eduService.verify(userDTO);
    }

    @PostMapping("/create")
    public UserDTO createUser(@RequestBody UserDTO userDTO){
         return eduService.createUserUsingDTO(userDTO);
    }


    @DeleteMapping("/delete")
    public String deleteUser(@RequestBody UserDTO userDTO){
        return eduService.deleteUserById(userDTO);
    }

    @GetMapping("/get")
    public List<UserDTO> getAllCourses(){
        return eduService.getAllUsers();
    }

    @GetMapping("")
    public UserDTO findUserByEmail()
    {
        return eduService.getUserByEmail();
    }

    @GetMapping("/get/{id}")
    public UserDTO findUserById(@PathVariable int id)
    {
        return eduService.getUserById(id);
    }

    @PutMapping("/update")
    public UserDTO updateCourse(@RequestBody UserDTO userDTO){
        return eduService.updateUser(userDTO);
    }

    @GetMapping("/test/{firstName}")
    public List<UserDTO> getUsersTest(@PathVariable String firstName){
       return userRepository.findUserByFirstname(firstName).stream().map(userMapper::toDTO).toList();
    }

    @GetMapping("/token/user/id")
    public String getUserId(){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = userDetails.getUsername();
        return username;
    }

    @PutMapping("/profile/update")
    public UserDTO updateProfile(@RequestBody UserDTO userDTO){
        return eduService.updateUserProfile(userDTO);
    }

    @PutMapping("/update/password")
    public ResponseEntity<CustomErrorResponse> updatePassword(@RequestBody PasswordDTO passwordDTO, HttpServletResponse response){

        if(eduService.changePassword(passwordDTO))
        {
            Cookie cookie = new Cookie("JwtToken", null);
            cookie.setPath("/"); // Set the same path as the original cookie
            cookie.setMaxAge(0); // Set maxAge to 0 to delete the cookie
            response.addCookie(cookie);

            return new ResponseEntity<>(new CustomErrorResponse(200, "Password Changed", new Date(System.currentTimeMillis())),HttpStatus.OK);
        }
        return new ResponseEntity<>(new CustomErrorResponse(403, "\"Incorrect Password, Please Enter Correct Password\"", new Date(System.currentTimeMillis())),HttpStatus.FORBIDDEN);
    }

    @PostMapping("/check")
    public Boolean checkPassword(@RequestBody PasswordDTO passwordDTO){
        return eduService.checkPassword(passwordDTO);
    }

    @PostMapping("/image")
    public String uploadImage(@RequestParam("file") MultipartFile file) throws Exception {
//        System.out.println("Line 138"+file.getOriginalFilename());
        return imageService.uploadImageToFileSystem(file);
    }

    @GetMapping("/image/{imageName}")
    public ResponseEntity<?> downloadImage(@PathVariable String imageName) throws Exception {
        byte[] image = imageService.downloadImage(imageName);
        String subtype = imageName.substring(imageName.lastIndexOf('.')+1);

        return ResponseEntity.ok().contentType(MediaType.asMediaType(new MimeType("image",subtype))).body(image);
    }



































    //    @PostMapping("/user/create")
//    public User createUser(@RequestBody User user){
//
//        User newUser = new User(user.getFirstName(), user.getLastName(), user.getEmail(), user.getPassword());
//
//        Role role = new Role(user.getRole().getRole());
//        role.setId(1);
//        newUser.setRole(role);
////        return newUser;
//        return eduService.createUser(newUser);
//    }








//    @GetMapping("/getAllStudents")
//    public List<User> getAllUser(){
//        return eduService.findAllUsers();
//    }
//
//    @GetMapping("/getAllCourses")
//    public List<Course> getAttCourses(){
//        return eduService.findAllCourses();
//    }
//
//    @GetMapping("/getStudent/{id}")
//    public User getUser(@PathVariable int id){
//        return eduService.findUserById(id);
//    }
//
//    @GetMapping("/getCourse/{id}")
//    public Course getCourse(@PathVariable int id){
//        return eduService.findCourseById(id);
//    }
//
//    @GetMapping("/Student/Name/{id}")
//    public Object getUserName(@PathVariable int id){
//        return eduService.findUserNameById(id);
//    }
//
//    @GetMapping("/associate/{studentId}/{courseId}")
//    public String getAssociation(@PathVariable int studentId, @PathVariable int courseId){
//        return eduService.associateUserToCourseById(studentId, courseId);
//    }
//
//    @GetMapping("/course/student/{id}")
//    public List<User> getStudentByCourse(@PathVariable int id){
//        return eduService.findByCourse(id);
//    }
//
//    @GetMapping("student/course/{id}")
//    public List<Course> getCourseByStudent(@PathVariable int id){
//        return eduService.findByUser(id);
//    }



}
