package com.education.eduAPI.repository;

import com.education.eduAPI.entity.Course;
import com.education.eduAPI.entity.Section;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SectionRepository extends JpaRepository<Section, Integer> {

    Section findBySectionName(String name);
    List<Section> findAllByCourse(Course course);

    @Transactional
    void deleteByIdIn(List<Integer> ids);
}
