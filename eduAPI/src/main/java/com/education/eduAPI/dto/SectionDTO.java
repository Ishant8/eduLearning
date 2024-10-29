package com.education.eduAPI.dto;

import java.util.List;

public class SectionDTO {
    private int sectionId;
    private String sectionName;
    private String sectionDescription;
    private String courseName;
    private List<SubSectionDTO> subSections;

    public SectionDTO() {
    }

    public SectionDTO(int sectionId, String sectionName, String sectionDescription, String courseName, List<SubSectionDTO> subSections) {
        this.sectionId = sectionId;
        this.sectionName = sectionName;
        this.sectionDescription = sectionDescription;
        this.courseName = courseName;
        this.subSections = subSections;
    }

    public int getSectionId() {
        return sectionId;
    }

    public void setSectionId(int sectionId) {
        this.sectionId = sectionId;
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

    public List<SubSectionDTO> getSubSections() {
        return subSections;
    }

    public void setSubSections(List<SubSectionDTO> subSections) {
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
