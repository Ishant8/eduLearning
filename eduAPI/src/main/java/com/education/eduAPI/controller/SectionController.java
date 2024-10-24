package com.education.eduAPI.controller;

import com.education.eduAPI.dto.SectionDTO;
import com.education.eduAPI.dto.SubSectionDTO;
import com.education.eduAPI.service.SectionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/section")
public class SectionController {

    SectionService sectionService;

    public SectionController(SectionService sectionService) {
        this.sectionService = sectionService;
    }

    @GetMapping
    public SectionDTO getSectionByName(@RequestBody String sectionName)
    {
        return sectionService.getSectionByName(sectionName);
    }

    @GetMapping
    public List<SectionDTO> getSectionsByCourseName(@RequestBody String courseName)
    {
        return sectionService.getSectionListByCourse(courseName);
    }

    @PostMapping
    public SectionDTO addSection(@RequestBody SectionDTO sectionDTO)
    {
        return sectionService.addSection(sectionDTO);
    }

    @PostMapping
    public List<SectionDTO> addSectionList(@RequestBody List<SectionDTO> sectionDTOList, String courseName)
    {
        return sectionService.addSectionList(sectionDTOList, courseName);
    }

    @GetMapping
    public List<SubSectionDTO> getSubSectionsBySectionName(String sectionName){
        return sectionService.getSubSectionListBySection(sectionName);
    }

    @PostMapping
    public SubSectionDTO addSubSection(SubSectionDTO SubSectionDTO)
    {
        return sectionService.setSubSection(SubSectionDTO);
    }

    @PostMapping
    public List<SubSectionDTO> addSubSectionList(@RequestBody List<SubSectionDTO> subSectionDTOList, String sectionName){
        return sectionService.addSubSectionList(subSectionDTOList, sectionName);
    }


}
