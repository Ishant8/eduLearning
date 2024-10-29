package com.education.eduAPI.dto;

public class ProgressDTO {
    private int userId;
    private int sectionId;

    public ProgressDTO() {
    }

    public ProgressDTO(int userId, int sectionId) {
        this.userId = userId;
        this.sectionId = sectionId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getSectionId() {
        return sectionId;
    }

    public void setSectionId(int sectionId) {
        this.sectionId = sectionId;
    }

    @Override
    public String toString() {
        return "ProgressDTO{" +
                "userId=" + userId +
                ", sectionId=" + sectionId +
                '}';
    }
}
