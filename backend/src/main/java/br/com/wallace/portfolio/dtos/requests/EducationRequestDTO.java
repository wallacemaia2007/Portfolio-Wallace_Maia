package br.com.wallace.portfolio.dtos.requests;

import java.time.LocalDate;

public record EducationRequestDTO(
        String institution,
        String course,
        LocalDate startDate,
        LocalDate endDate,
        Boolean current,
        String description,
        String location,
        String certificateUrl) {

}
