package com.education.eduAPI.mapper;

import com.education.eduAPI.dto.SubSectionDTO;
import com.education.eduAPI.entity.SubSection;
import com.education.eduAPI.repository.SectionRepository;
import org.springframework.stereotype.Component;

@Component
public class SubSectionMapper {

    SectionRepository sectionRepository;

    public SubSectionMapper(SectionRepository sectionRepository) {
        this.sectionRepository = sectionRepository;
    }

    public SubSectionDTO toDto(SubSection subSection){
        SubSectionDTO subSectionDTO = new SubSectionDTO();
        subSectionDTO.setId(subSection.getId());
        subSectionDTO.setSubSectionName(subSection.getSubSectionName());
        subSectionDTO.setContent(subSection.getContent());
        subSectionDTO.setSectionName(subSection.getSection().getSectionName());

        return subSectionDTO;
    }

    public SubSection toEntity(SubSectionDTO subSectionDTO){
        SubSection subSection = new SubSection();
        subSection.setId(subSectionDTO.getId());
        subSection.setSubSectionName(subSectionDTO.getSubSectionName());
        subSection.setContent(subSectionDTO.getContent());
        if(subSectionDTO.getSectionName() != null){
            System.out.println("=========Mapper Fetch Called============");
            subSection.setSection(sectionRepository.findBySectionName(subSectionDTO.getSectionName()));
        }
        else{
            subSection.setSection(null);
        }

        return subSection;
    }
}
