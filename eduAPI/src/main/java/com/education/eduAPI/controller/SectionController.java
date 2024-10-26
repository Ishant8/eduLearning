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

    @GetMapping("/get")
    public SectionDTO getSectionByName(@RequestBody String sectionName)
    {
        return sectionService.getSectionByName(sectionName);
    }

    @GetMapping("/get/course")
    public List<SectionDTO> getSectionsByCourseName(@RequestParam String courseName)
    {
        return sectionService.getSectionListByCourse(courseName);
    }

    @PostMapping("/add")
    public SectionDTO addSection(@RequestBody SectionDTO sectionDTO)
    {
        System.out.println("----------------------------------------------Hello");
        return sectionService.addSection(sectionDTO);
    }

    @PostMapping("/add/list")
    public List<SectionDTO> addSectionList(@RequestBody List<SectionDTO> sectionDTOList,@RequestParam("courseName") String courseName)
    {
        return sectionService.addSectionList(sectionDTOList, courseName);
    }

    @GetMapping
    public List<SubSectionDTO> getSubSectionsBySectionName(String sectionName){
        return sectionService.getSubSectionListBySection(sectionName);
    }

    @PostMapping("/subsection/add")
    public SubSectionDTO addSubSection(SubSectionDTO SubSectionDTO)
    {
        return sectionService.setSubSection(SubSectionDTO);
    }

    @PostMapping("/subsection/list")
    public List<SubSectionDTO> addSubSectionList(@RequestBody List<SubSectionDTO> subSectionDTOList, String sectionName){
//        return sectionService.add(subSectionDTOList, sectionName);
        return null;
    }


}
