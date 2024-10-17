package com.education.eduAPI.dto;

public class ReviewDTO {


    private int reviewId;
    private String comment;
    private String userName;
    private String profileImage;
    private int userId;
    private int courseId;
    private String courseName;
    private int rating;

    public ReviewDTO() {
    }

    public ReviewDTO(int reviewId, String comment, String userName, int userId, int courseId, int rating, String profileImage, String courseName) {
        this.reviewId = reviewId;
        this.comment = comment;
        this.userName = userName;
        this.userId = userId;
        this.courseId = courseId;
        this.rating = rating;
        this.profileImage = profileImage;
        this.courseName = courseName;
    }

    public int getReviewId() {
        return reviewId;
    }

    public void setReviewId(int reviewId) {
        this.reviewId = reviewId;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getCourseId() {
        return courseId;
    }

    public void setCourseId(int courseId) {
        this.courseId = courseId;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }
}
