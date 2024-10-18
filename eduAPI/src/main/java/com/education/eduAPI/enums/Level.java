package com.education.eduAPI.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum Level {
    @JsonProperty("Beginner")
    Beginner,
    @JsonProperty("Intermediate")
    Intermediate,
    @JsonProperty("Advanced")
    Advanced
}
