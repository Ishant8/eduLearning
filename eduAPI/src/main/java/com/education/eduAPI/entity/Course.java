package com.education.eduAPI.entity;

import com.education.eduAPI.enums.Level;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "course")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "course_id")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    private int courseId;

    @Column(name = "course_name")
    private String courseName;

    @Column(name = "course_description", columnDefinition = "longtext")
    private String courseDescription;

    @Column(name = "hours")
    private double hours;

    @Column(name = "sections")
    private int sections;

    @Column(name = "price")
    private double price;

    @Column(name = "level")
    @Enumerated(EnumType.STRING)
    private Level level;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cover_image_id")
    private Image coverImage;

    @Column(name = "created_at")
    @CreationTimestamp
    private Date createDate;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private Date updateDate;

    @ManyToOne(cascade = {CascadeType.PERSIST,CascadeType.DETACH,CascadeType.REFRESH})
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(cascade = {CascadeType.MERGE,CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH}, mappedBy = "course")
    private List<Review> reviews;

//    @JsonIgnore
    @ManyToMany(cascade = {CascadeType.MERGE,CascadeType.DETACH,CascadeType.REFRESH})
    @JoinTable(name = "course_user", joinColumns =@JoinColumn(name = "course_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
     private List<User> users;

    public Course(String courseName, String courseDescription, double hours, int sections, double price, Level level, Image coverImage, Date createDate, Date updateDate, Category category) {
        this.courseName = courseName;
        this.courseDescription = courseDescription;
        this.hours = hours;
        this.sections = sections;
        this.price = price;
        this.level = level;
        this.coverImage = coverImage;
        this.createDate = createDate;
        this.updateDate = updateDate;
        this.category = category;
    }

    public Course() {

    }

    public int getCourseId() {
        return courseId;
    }

    public void setCourseId(int courseId) {
        this.courseId = courseId;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }


    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public String getCourseDescription() {
        return courseDescription;
    }

    public void setCourseDescription(String courseDescription) {
        this.courseDescription = courseDescription;
    }

    public double getHours() {
        return hours;
    }

    public void setHours(double hours) {
        this.hours = hours;
    }

    public int getSections() {
        return sections;
    }

    public void setSections(int sections) {
        this.sections = sections;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Level getLevel() {
        return level;
    }

    public void setLevel(Level level) {
        this.level = level;
    }

    public Image getCoverImage() {
        return coverImage;
    }

    public void setCoverImage(Image coverImage) {
        this.coverImage = coverImage;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public void addUser(User user) {

        if(this.users == null){
            this.users = new ArrayList<>();
        }

        users.add(user);
    }

    public void addReview(Review review) {

        if(this.reviews == null){
            this.reviews = new ArrayList<>();
        }

        reviews.add(review);
    }

//    @Override
//    public String toString() {
//        return "Course{" + "course_id=" + courseId + ", courseName='" + courseName + ", category=" + category +'}';
//    }


    @Override
    public String toString() {
        return "Course{" +
                "courseId=" + courseId +
                ", courseName='" + courseName + '\'' +
                ", courseDescription='" + courseDescription + '\'' +
                ", hours=" + hours +
                ", sections=" + sections +
                ", price=" + price +
                ", level=" + level +
                ", coverImage=" + coverImage +
                ", createDate=" + createDate +
                ", updateDate=" + updateDate +
                ", category=" + category +
                '}';
    }
}
