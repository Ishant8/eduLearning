package com.education.eduAPI.service;

import com.education.eduAPI.dto.SectionDTO;
import com.education.eduAPI.dto.SubSectionDTO;

import java.util.List;


public interface SectionService {

    SectionDTO getSectionByName(String courseName);

    List<SectionDTO> getSectionListByCourse(String courseName);

    SectionDTO addSection(SectionDTO sectionDTO);

    List<SectionDTO> addSectionList(List<SectionDTO> sectionDTOList, String courseName);

    List<SubSectionDTO> getSubSectionListBySection(String sectionName);

    SubSectionDTO setSubSection(SubSectionDTO subSectionDTO);

    List<SubSectionDTO> addSubSectionList(List<SubSectionDTO> subSectionDTOList, String sectionName);


}
