package br.com.wallace.portfolio.mappers;

import java.util.List;

import br.com.wallace.portfolio.dtos.ExperienceResponseDTO;
import br.com.wallace.portfolio.exceptions.ExperienceNotFoundException;
import br.com.wallace.portfolio.model.entities.Experience;

public class ExperienceMapper {

    public static ExperienceResponseDTO toResponse(Experience experience) {
        if (experience == null) {
            throw new ExperienceNotFoundException("Experience Not Found");
        }

        List<String> technologies = experience.getTechnologies();

        return new ExperienceResponseDTO(
                experience.getId(),
                experience.getCompany(),
                experience.getPosition(),
                experience.getDescription(),
                experience.getStartDate(),
                experience.getEndDate(),
                experience.isCurrent(),
                experience.getLocation(),
                experience.getType(),
                technologies,
                experience.getCompanyLogo(),
                experience.getCompanyUrl()
        );
    }
}