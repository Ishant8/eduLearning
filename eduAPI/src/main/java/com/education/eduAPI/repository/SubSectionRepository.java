package com.education.eduAPI.repository;

import com.education.eduAPI.entity.Section;
import com.education.eduAPI.entity.SubSection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubSectionRepository extends JpaRepository<SubSection, Integer> {

    List<SubSection> findAllBySection(Section section);
}
