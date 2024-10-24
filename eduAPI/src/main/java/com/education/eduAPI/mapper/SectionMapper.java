package com.education.eduAPI.mapper;

import com.education.eduAPI.dto.SectionDTO;
import com.education.eduAPI.entity.Section;
import com.education.eduAPI.repository.CourseRepository;
import org.springframework.stereotype.Component;

@Component
public class SectionMapper {

    CourseRepository courseRepository;

    public SectionMapper(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public SectionDTO toDto(Section section) {
        SectionDTO sectionDTO = new SectionDTO();
        sectionDTO.setSectionName(section.getSectionName());
        sectionDTO.setSectionDescription(section.getSectionDescription());
        sectionDTO.setCourseName(section.getCourse().getCourseName());
        sectionDTO.setSubSections(section.getSubSections());

        return sectionDTO;
    }

    public Section toEntity(SectionDTO sectionDTO) {
        Section section = new Section();

        section.setSectionName(sectionDTO.getSectionName());
        section.setSectionDescription(sectionDTO.getSectionDescription());
        section.setSubSections(sectionDTO.getSubSections());
        if(sectionDTO.getCourseName() != null){
            section.setCourse(courseRepository.findCourseByCourseName(sectionDTO.getCourseName()));

        }
        else{
            section.setCourse(null);
        }

        return section;
    }
}
