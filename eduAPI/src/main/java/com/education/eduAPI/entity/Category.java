package com.education.eduAPI.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private int categoryId;

    @Column(name = "category_name")
    private String categoryName;

//    @OneToMany(fetch = FetchType.EAGER,mappedBy = "category", cascade = CascadeType.ALL)
//    List<Course> courses;


    public Category(String categoryName) {
        this.categoryName = categoryName;
    }

    public Category() {

    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

//    public List<Course> getCourses() {
//        return courses;
//    }
//
//    public void setCourses(List<Course> courses) {
//        this.courses = courses;
//    }
//
//    public void addCourse(Course course) {
//        if(this.courses == null){
//            this.courses = new ArrayList<>();
//        }
//
//        this.courses.add(course);
//    }

    @Override
    public String toString() {
        return "Category{" + "categoryId=" + categoryId + ", categoryName='" + categoryName + '\'' + '}';
    }
}
