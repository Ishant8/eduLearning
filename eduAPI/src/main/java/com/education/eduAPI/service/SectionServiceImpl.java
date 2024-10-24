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

    @Override
    public SectionDTO addSection(SectionDTO sectionDTO) {

        Section section =  sectionRepository.save(sectionMapper.toEntity(sectionDTO));
        return sectionMapper.toDto(section);
    }

    @Override
    public List<SectionDTO> addSectionList(List<SectionDTO> sectionDTOList, String courseName) {

        Course course = courseRepository.findCourseByCourseName(courseName);
        List<Section> sections = new ArrayList<Section>();
        sectionDTOList.forEach(secDto -> {
            Section sec = sectionMapper.toEntity(secDto);
            sec.setCourse(course);
            sections.add(sec);
        });

        return sectionRepository.saveAll(sections).stream().map(section -> sectionMapper.toDto(section)).toList();
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

    @Override
    public List<SubSectionDTO> addSubSectionList(List<SubSectionDTO> subSectionDTOList, String sectionName) {
        Section section = sectionRepository.findBySectionName(sectionName);
        List<SubSection> subSections = new ArrayList<SubSection>();
        subSectionDTOList.forEach(subSecDto -> {
            SubSection subSec = subSectionMapper.toEntity(subSecDto);
            subSec.setSection(section);
            subSections.add(subSec);
        });

        return subSectionRepository.saveAll(subSections).stream().map(subSection -> subSectionMapper.toDto(subSection)).toList();
    }


}
