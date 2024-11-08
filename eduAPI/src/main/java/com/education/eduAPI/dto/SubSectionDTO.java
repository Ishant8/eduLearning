package com.education.eduAPI.dto;

public class SubSectionDTO {

    private int id;
    private String subSectionName;
    private String content;
    private String sectionName;

    public SubSectionDTO(int id, String subSectionName, String content, String sectionName) {
        this.id = id;
        this.subSectionName = subSectionName;
        this.content = content;
        this.sectionName = sectionName;
    }

    public SubSectionDTO(){

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSubSectionName() {
        return subSectionName;
    }

    public void setSubSectionName(String subSectionName) {
        this.subSectionName = subSectionName;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSectionName() {
        return sectionName;
    }

    public void setSectionName(String sectionName) {
        this.sectionName = sectionName;
    }

    @Override
    public String toString() {
        return "SubSectionDTO{" +
                "subSectionName='" + subSectionName + '\'' +
                ", content='" + content + '\'' +
                ", sectionName='" + sectionName + '\'' +
                '}';
    }
}
