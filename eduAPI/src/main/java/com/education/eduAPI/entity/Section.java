package com.education.eduAPI.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "section")
public class Section {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "section_name")
    private String sectionName;

    @Column(name = "section_description")
    private String sectionDescription;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "course_id")
    private Course course;

    @OneToMany(mappedBy = "section", cascade = CascadeType.ALL)
    private List<SubSection> subSections;

    public Section() {
    }

    public Section(String sectionName, String sectionDescription, Course course) {
        this.sectionName = sectionName;
        this.sectionDescription = sectionDescription;
        this.course = course;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSectionName() {
        return sectionName;
    }

    public void setSectionName(String sectionName) {
        this.sectionName = sectionName;
    }

    public String getSectionDescription() {
        return sectionDescription;
    }

    public void setSectionDescription(String sectionDescription) {
        this.sectionDescription = sectionDescription;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public List<SubSection> getSubSections() {
        return subSections;
    }

    public void setSubSections(List<SubSection> subSections) {
        this.subSections = subSections;
    }

    public void addSubSection(SubSection subSection) {
        if (subSections == null) {
            subSections = new ArrayList<>();
        }

        subSections.add(subSection);
    }

    @Override
    public String toString() {
        return "Section{" +
                "id=" + id +
                ", sectionName='" + sectionName + '\'' +
                ", description='" + sectionDescription + '\'' +
                ", course=" + course +
                '}';
    }
}
