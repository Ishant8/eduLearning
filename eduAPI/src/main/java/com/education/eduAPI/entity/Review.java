package com.education.eduAPI.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private int id;

    @Column(name = "comment")
    private String comment;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @Column(name = "rating")
    private int rating;

    public Review(String comment, int rating) {
        this.comment = comment;
        this.rating = rating;
//        this.user = user;
//        this.course = course;
    }

    public Review(){

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    @Override
    public String toString() {
        String str = user==null?null:user.getEmail();

        return "Review{" +
                "id=" + id +
                ", comment='" + comment + '\'' +
                ", user=" + str +
//                ", course=" + course +
                ", rating=" + rating +
                '}';
    }
}
