package com.education.eduAPI.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class SectionsWrapper {

    @JsonProperty("sections")
    private List<SectionDTO> sectionList;

    public SectionsWrapper(){

    }

    public SectionsWrapper(List<SectionDTO> sectionList) {
        this.sectionList = sectionList;
    }

    public List<SectionDTO> getSectionList() {
        return sectionList;
    }

    public void setSectionList(List<SectionDTO> sectionList) {
        this.sectionList = sectionList;
    }
}
