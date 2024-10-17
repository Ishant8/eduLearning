package com.education.eduAPI.repository;

import com.education.eduAPI.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Integer> {
    Optional<Image> findByName(String fileName);
}
