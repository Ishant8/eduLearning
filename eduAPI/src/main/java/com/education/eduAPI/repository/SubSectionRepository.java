package com.education.eduAPI.repository;

import com.education.eduAPI.entity.Section;
import com.education.eduAPI.entity.SubSection;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubSectionRepository extends JpaRepository<SubSection, Integer> {

    List<SubSection> findAllBySection(Section section);

    @Transactional
    void deleteByIdIn(List<Integer> ids);

    List<SubSection> findAllByIdIn(List<Integer> ids);

}
