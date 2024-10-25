package com.education.eduAPI.service;

import com.education.eduAPI.dto.SectionDTO;
import com.education.eduAPI.dto.SubSectionDTO;
import com.education.eduAPI.entity.Course;
import com.education.eduAPI.entity.Section;
import com.education.eduAPI.entity.SubSection;
import com.education.eduAPI.mapper.SectionMapper;
import com.education.eduAPI.mapper.SubSectionMapper;
import com.education.eduAPI.repository.CourseRepository;
import com.education.eduAPI.repository.SectionRepository;
import com.education.eduAPI.repository.SubSectionRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SectionServiceImpl implements SectionService {

    SectionMapper sectionMapper;
    SubSectionMapper subSectionMapper;
    SectionRepository sectionRepository;
    CourseRepository courseRepository;
    SubSectionRepository subSectionRepository;

    public SectionServiceImpl(SectionMapper sectionMapper, SectionRepository sectionRepository, CourseRepository courseRepository, SubSectionRepository subSectionRepository, SubSectionMapper subSectionMapper) {
        this.sectionMapper = sectionMapper;
        this.sectionRepository = sectionRepository;
        this.courseRepository = courseRepository;
        this.subSectionRepository = subSectionRepository;
        this.subSectionMapper = subSectionMapper;
    }

    @Override
    public SectionDTO getSectionByName(String sectionName) {
        return sectionMapper.toDto(sectionRepository.findBySectionName(sectionName));
    }

    @Override
    public List<SectionDTO> getSectionListByCourse(String courseName) {

        return sectionRepository
        .findAllByCourse(courseRepository.findCourseByCourseName(courseName))
        .stream().map(section -> sectionMapper.toDto(section)).toList();

    }

//    @Override
//    public SectionDTO addSection(SectionDTO sectionDTO) {
//
//        List<SubSectionDTO> subSectionDTO = sectionDTO.getSubSections();
//        System.out.println("Subsections to be saved: " + subSectionDTO.stream()
//                .map(SubSectionDTO::getSubSectionName)
//                .collect(Collectors.joining(", ")));
//        sectionDTO.setSubSections(null);
//        System.out.println("================Inside Add section=========sectionDTO to save "+ sectionDTO);
//
//        Section sectionInitial = sectionMapper.toEntity(sectionDTO);
//        System.out.println("==================================Section Entity being saved=================="+sectionInitial.getSectionName()+" "+sectionInitial.getSubSections());
//
//        Section section =  sectionRepository.save(sectionInitial);
//
//        System.out.println("========================Calling AddSubSectionList===========================");
//        section.setSubSections(
//                addSubSectionList(subSectionDTO, section.getSectionName())
//                        .stream().map(subsection -> subSectionMapper.toEntity(subsection)).toList());
//
//        return sectionMapper.toDto(section);
//    }
//
//    @Override
//    public List<SectionDTO> addSectionList(List<SectionDTO> sectionDTOList, String courseName) {
//
//        Course course = courseRepository.findCourseByCourseName(courseName);
//        List<SectionDTO> sectionDTOs = new ArrayList<>();
//
//        sectionDTOList.forEach(secDto -> {
//
//            secDto.setCourseName(courseName);
//
//            SectionDTO added_section = addSection(secDto);
//            System.out.println("================================= Section Add called ============================");
//
//            sectionDTOs.add(added_section);
//            System.out.println("================================= return of Section Add into sectionDTOs ============================");
//        });
//
//        return sectionDTOs;
//    }

    @Override
    public List<SectionDTO> addSectionList(List<SectionDTO> sectionDTOList, String courseName) {
        Course course = courseRepository.findCourseByCourseName(courseName);
        return sectionDTOList.stream()
                .map(secDto -> {
                    secDto.setCourseName(courseName);
                    return addSection(secDto);
                })
                .collect(Collectors.toList());
    }

    @Override
    public SectionDTO addSection(SectionDTO sectionDTO) {
        // Store subsections temporarily
        List<SubSectionDTO> subSectionDTOs = sectionDTO.getSubSections();
        sectionDTO.setSubSections(null);

        // Save section first
        Section section = sectionRepository.save(sectionMapper.toEntity(sectionDTO));

        // Add subsections using the actual section entity
        if (subSectionDTOs != null && !subSectionDTOs.isEmpty()) {
            List<SubSection> savedSubSections = addSubSections(subSectionDTOs, section);
            section.setSubSections(savedSubSections);
        }

        return sectionMapper.toDto(section);
    }

    @Override
    public List<SubSectionDTO> getSubSectionListBySection(String sectionName) {

        Section section = sectionRepository.findBySectionName(sectionName);

        return subSectionRepository.findAllBySection(section).stream().map(subSec -> subSectionMapper.toDto(subSec)).toList();

    }

    @Override
    public SubSectionDTO setSubSection(SubSectionDTO subSectionDTO) {

        SubSection subsection = subSectionRepository.save(subSectionMapper.toEntity(subSectionDTO));

        return subSectionMapper.toDto(subsection);
    }

//    @Override
//    public List<SubSectionDTO> addSubSectionList(List<SubSectionDTO> subSectionDTOList, String sectionName) {
//
//
//        System.out.println("========================Finding section inside addSubsection ist===========================");
//        Section section = sectionRepository.findBySectionName(sectionName);
//        System.out.println("Found section: " + section.getSectionName() + " with ID: " + section.getId() +
//                " when looking for section: " + sectionName);
//        List<SubSection> subSections = new ArrayList<>();
//        subSectionDTOList.forEach(subSecDto -> {
//            System.out.println("========================Iterating subsections===========================");
//
//            SubSection subSec = subSectionMapper.toEntity(subSecDto);
//            subSec.setSection(section);
//            subSections.add(subSec);
//        });
//
//        System.out.print("--___________-------_________&&&&--___________-------_________&&&& ");
//        subSections.forEach((subSection) -> {
//            System.out.println(subSection.getSubSectionName() +" "+ section.getSectionName());
//        });
//
//        subSections.forEach(sub -> {
//            System.out.println("About to save subsection: " + sub.getSubSectionName() +
//                    " for section: " + sub.getSection().getSectionName() +
//                    " with section ID: " + sub.getSection().getId());
//        });
//
//        return subSectionRepository.saveAll(subSections).stream().map(subSection -> subSectionMapper.toDto(subSection)).toList();
//    }

    public List<SubSection> addSubSections(List<SubSectionDTO> subSectionDTOs, Section section) {
        List<SubSection> subSections = subSectionDTOs.stream()
                .map(dto -> {
                    SubSection subSection = subSectionMapper.toEntity(dto);
                    subSection.setSection(section);
                    return subSection;
                })
                .collect(Collectors.toList());

        return subSectionRepository.saveAll(subSections);
    }


}
