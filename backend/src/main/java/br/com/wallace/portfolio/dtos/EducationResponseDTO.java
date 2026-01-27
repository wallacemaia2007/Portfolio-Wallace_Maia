package br.com.wallace.portfolio.dtos;

import java.time.LocalDate;

public record EducationResponseDTO(
        Long id,
        String institution,
        String course,
        LocalDate startDate,
        LocalDate endDate,
        boolean current,
        String description,
        String location,
        String certificateUrl) {
}
