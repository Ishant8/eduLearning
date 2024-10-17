package com.education.eduAPI;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EduApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(EduApiApplication.class, args);
	}
//	@Bean
//	public CommandLineRunner commandLineRunner (UserRepository eduRepository, CourseRepository courseRepository, CategoryRepository categoryRepository, RoleRepository roleRepository) {
////		return runner -> createStudent(eduRepository,courseRepository);
//		return runner -> createStudent(eduRepository, courseRepository,roleRepository);
//
//	}
////
//	private void createStudent(UserRepository eduRepository, CourseRepository courseRepository, RoleRepository roleRepository) {
//
//		User user = new User("Beredolth","Ultimus","Aero@Gmail.com","09jp9ojhp9o");
//
//		Role role = roleRepository.findById(1).orElseThrow();
//
//		user.setRole(role);
//
//
//
////		Course course = new Course("Stoicism Course");
////		course.setCategory(new Category("Philosophy"));
//
////		Review review = new Review("I really like this course.");
////		review.setUser(user);
////		course.addReview(review);
////
////
////		user.addCourse(course);
////		user.setRole(new Role("ROLE_USER"));
//
//		eduRepository.save(user);
////
////		course = courseRepository.findCourseByCourseName("Stoicism Course");
////		course.addReview(new Review("I really like this course."));
////
////		courseRepository.save(course);
//	}
////


//	void createCourse(CourseRepository courseRepository, CategoryRepository categoryRepository) {
//
//		Course course = new Course("Astro Course");
//
//		Category category = categoryRepository.findByCategoryName("AstroPhysics");
//
//		course.setCategory(category);
//// disabling persist and enabling merge fixes this problem. but disabling persist prevents creation of new categories with course.
//
//		courseRepository.save(course);
//	}
//
//	private void findStudent(EduRepository eduRepository){
//
//		Student student = eduRepository.findById(3).orElse(null);
//		System.out.println(student);
//	}
//
//	private void deleteStudent(EduRepository eduRepository){
//		eduRepository.deleteById(5);
//	}
//
//	private void updateStudent(EduRepository eduRepository, CourseRepository courseRepository){
//
//		Student student = eduRepository.findById(3).orElse(null);
//		if(student == null){return;}
//
//		student.setFirstName("Dhirendra");
//		student.setEmail("Dhirendra@gmail.com");
//
//		Course course = courseRepository.findAll().get(0);
//		student.addCourse(course);
//
//		eduRepository.save(student);
//
//		System.out.println(eduRepository.findById(3).orElse(null));
//	}


}
