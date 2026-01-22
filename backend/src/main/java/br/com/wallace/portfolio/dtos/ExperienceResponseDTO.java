package br.com.wallace.portfolio.dtos;

import java.time.LocalDate;
import java.util.List;

public record ExperienceResponseDTO(
    Long id,
    String company,
    String position,
    String description,
    LocalDate startDate,
    LocalDate endDate,
    boolean current,
    String location,
    String type,
    List<String> technologies,
    List<String> achievements,
    String companyLogo,
    String companyUrl,
    Long profileId
) {
}