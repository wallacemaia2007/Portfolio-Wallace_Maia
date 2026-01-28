package br.com.wallace.portfolio.dtos.requests;

import java.time.LocalDate;
import java.util.List;

public record ExperienceRequestDTO(String company,
        String position,
        String description,
        LocalDate startDate,
        LocalDate endDate,
        Boolean current,
        String location,
        String type,
        List<String> technologies,
        String companyLogo,
        String companyUrl) {

}
