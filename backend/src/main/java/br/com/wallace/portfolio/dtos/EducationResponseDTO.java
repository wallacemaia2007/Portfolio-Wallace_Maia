package br.com.wallace.portfolio.dtos;

public record EducationResponseDTO(
        String id,
        String institution,
        String course,
        String startDate,
        String endDate,
        boolean current,
        String description,
        String location,
        String certificateUrl) {
}
