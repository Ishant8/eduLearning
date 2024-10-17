package com.education.eduAPI.service;

import com.education.eduAPI.entity.Image;
import com.education.eduAPI.entity.User;
import com.education.eduAPI.exception.CustomEntityNotFoundException;
import com.education.eduAPI.repository.ImageRepository;
import com.education.eduAPI.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.time.Instant;
import java.util.Objects;
import java.util.Optional;

@Service
public class ImageServiceImpl implements ImageService{

    private final String FILE_PATH = "/home/anant/Projects/eduLearning/eduFrontend/public/images/common/";

    private final ImageRepository imageRepository;
    private final UserRepository userRepository;

    public ImageServiceImpl(ImageRepository imageRepository, UserRepository userRepository) {
        this.imageRepository = imageRepository;
        this.userRepository = userRepository;
    }

    @Override
    public String uploadImageToFileSystem(MultipartFile file) throws IOException, URISyntaxException {

        String[] fileName = Objects.requireNonNull(file.getOriginalFilename()).split("\\.");
        String filePath = FILE_PATH + fileName[0]+ "_" +Instant.now().getEpochSecond()+"."+fileName[1];


        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = userDetails.getUsername();

        User user;
        try {
            user = userRepository.findUserByEmail(email);
        }catch(Exception e){
            throw new CustomEntityNotFoundException("No Such user with provided email");
        }

        Image image = new Image();


        image.setName(file.getOriginalFilename());
        image.setType(file.getContentType());
        image.setFilePath(filePath);

        if(user.getProfileImage() != null) {
            image.setImageId(user.getProfileImage().getImageId());
        }

        user.setProfileImage(image);
        userRepository.save(user);

        file.transferTo(new File(filePath));

        return image.getFilePath();
    }

    @Override
    public byte[] downloadImage(String fileName) throws IOException {
        Optional<Image> image = imageRepository.findByName(fileName);
        String filePath = image.get().getFilePath();
        byte[] images = Files.readAllBytes(new File(filePath).toPath());
        return images;
    }
}
