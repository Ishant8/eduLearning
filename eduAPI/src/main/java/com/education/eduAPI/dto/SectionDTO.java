package com.education.eduAPI.dto;

import com.education.eduAPI.entity.SubSection;

import java.util.List;

public class SectionDTO {
    private String sectionName;
    private String sectionDescription;
    private String courseName;
    private List<SubSection> subSections;

    public SectionDTO() {
    }

    public SectionDTO(String sectionName, String sectionDescription, String courseName, List<SubSection> subSections) {
        this.sectionName = sectionName;
        this.sectionDescription = sectionDescription;
        this.courseName = courseName;
        this.subSections = subSections;
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

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public List<SubSection> getSubSections() {
        return subSections;
    }

    public void setSubSections(List<SubSection> subSections) {
        this.subSections = subSections;
    }

    @Override
    public String toString() {
        return "SectionDTO{" +
                "sectionName='" + sectionName + '\'' +
                ", sectionDescription='" + sectionDescription + '\'' +
                ", courseName='" + courseName + '\'' +
                ", subSections=" + subSections +
                '}';
    }
}
