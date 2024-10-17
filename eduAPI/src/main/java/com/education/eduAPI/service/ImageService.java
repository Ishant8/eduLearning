package com.education.eduAPI.service;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

    String uploadImageToFileSystem(MultipartFile file) throws Exception;

    byte[] downloadImage(String fileName)throws Exception;
}
