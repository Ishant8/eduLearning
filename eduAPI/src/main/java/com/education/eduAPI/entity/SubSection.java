package com.education.eduAPI.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "sub_section")
public class SubSection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "sub_section_name")
    private String subSectionName;

    @Column(name = "content")
    private String content;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "section_id")
    private Section section;

    public SubSection() {
    }

    public SubSection(String subSectionName, String content, Section section) {
        this.subSectionName = subSectionName;
        this.content = content;
        this.section = section;
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

    public Section getSection() {
        return section;
    }

    public void setSection(Section section) {
        this.section = section;
    }

    @Override
    public String toString() {
        return "SubSection{" +
                "id=" + id +
                ", subSectionName='" + subSectionName + '\'' +
                ", content='" + content + '\'' +
                ", section=" + section +
                '}';
    }
}
