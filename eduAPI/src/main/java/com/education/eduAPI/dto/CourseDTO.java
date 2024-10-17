package com.education.eduAPI.dto;

import com.education.eduAPI.enums.Level;

import java.util.Date;
import java.util.List;
import java.util.Map;

public class CourseDTO {

    private int courseId;
    private String courseName;
    private String categoryName;
    private String courseDescription;
    private double hours;
    private int sections;
    private double price;
    private Level level;
    private String coverImage;
    private Date createDate;
    private Date updateDate;
    private String profileImage;
    private Map<Integer,String> instructorDetails;
    private List<ReviewDTO> reviews;

    public CourseDTO(int courseId, String courseName, String categoryName, Map<Integer, String> instructorDetails, List<ReviewDTO> reviews) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.categoryName = categoryName;
        this.instructorDetails = instructorDetails;
        this.reviews = reviews;
    }

    public CourseDTO() {

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

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Map<Integer, String> getInstructorDetails() {
        return instructorDetails;
    }

    public void setInstructorDetails(Map<Integer, String> instructorDetails) {
        this.instructorDetails = instructorDetails;
    }

    public List<ReviewDTO> getReviews() {
        return reviews;
    }

    public void setReviews(List<ReviewDTO> reviews) {
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

    public String getCoverImage() {
        return coverImage;
    }

    public void setCoverImage(String coverImage) {
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

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }
}
