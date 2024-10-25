package com.education.eduAPI.mapper;

import com.education.eduAPI.dto.SectionDTO;
import com.education.eduAPI.entity.Section;
import com.education.eduAPI.repository.CourseRepository;
import org.springframework.stereotype.Component;

@Component
public class SectionMapper {

    private final SubSectionMapper subSectionMapper;
    CourseRepository courseRepository;

    public SectionMapper(CourseRepository courseRepository, SubSectionMapper subSectionMapper) {
        this.courseRepository = courseRepository;
        this.subSectionMapper = subSectionMapper;
    }

    public SectionDTO toDto(Section section) {
        SectionDTO sectionDTO = new SectionDTO();
        sectionDTO.setSectionName(section.getSectionName());
        sectionDTO.setSectionDescription(section.getSectionDescription());
        sectionDTO.setCourseName(section.getCourse().getCourseName());
        if(section.getSubSections() != null) {
            sectionDTO.setSubSections(section.getSubSections().stream().map(subSectionMapper::toDto).toList());
        }

        return sectionDTO;
    }

    public Section toEntity(SectionDTO sectionDTO) {
        Section section = new Section();

        section.setSectionName(sectionDTO.getSectionName());
        section.setSectionDescription(sectionDTO.getSectionDescription());

        if(sectionDTO.getSubSections() != null) {
            section.setSubSections(sectionDTO.getSubSections().stream().map(subSectionMapper::toEntity).toList());
        }else {
            section.setSubSections(null);
        }

        if(sectionDTO.getCourseName() != null){
            System.out.println("=========Mapper Fetch Called============");
            section.setCourse(courseRepository.findCourseByCourseName(sectionDTO.getCourseName()));

        }
        else{
            section.setCourse(null);
        }

        return section;
    }
}
