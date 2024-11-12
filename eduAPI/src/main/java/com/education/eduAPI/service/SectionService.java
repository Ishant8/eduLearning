package com.education.eduAPI.service;

import com.education.eduAPI.dto.SectionDTO;
import com.education.eduAPI.dto.SubSectionDTO;
import com.education.eduAPI.entity.Course;
import com.education.eduAPI.entity.Section;
import com.education.eduAPI.entity.SubSection;

import java.util.List;


public interface SectionService {

    SectionDTO getSectionByName(String courseName);

    List<SectionDTO> getSectionListByCourse(String courseName);

    SectionDTO addSection(SectionDTO sectionDTO);

    List<SectionDTO> addSectionList(List<SectionDTO> sectionDTOList, String courseName);

    List<SubSectionDTO> getSubSectionListBySection(String sectionName);

    SubSectionDTO setSubSection(SubSectionDTO subSectionDTO);

    List<SubSection> addSubSections(List<SubSectionDTO> subSectionDTOList, Section section);

    List<SectionDTO> updateSectionList(List<SectionDTO> sectionDTOList, String courseName, String deletedSections, String deletedSubSections);

    SectionDTO updateSection(SectionDTO section, Course course);

}
