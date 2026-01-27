package br.com.wallace.portfolio.dtos;

import java.util.List;

public record ExperienceResponseDTO(
    String id,
    String company,
    String position,
    String description,
    String startDate,
    String endDate,
    boolean current,
    String location,
    String type,
    List<String> technologies,
    String companyLogo,
    String companyUrl
) {
}