package com.education.eduAPI.repository;

import com.education.eduAPI.entity.Course;
import com.education.eduAPI.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Integer> {

    @Query("SELECT s.userId,s.firstName from User s where s.userId=:id")
    Object findUserById(@Param("id") Integer id);

    @Query("select new User(s.firstName, s.lastName, s.email, s.password) from User s  where s.firstName=:firstName")
    List<User> findUserByFirstname(@Param("firstName") String firstName);

    User findByFirstName(String firstName);

    User findUserByEmail(String firstName);

    List<User> findByCourses(Course course);

    List<User> findAllByUserIdIn(List<Integer> ids);
}
