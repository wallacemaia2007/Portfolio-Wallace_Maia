package br.com.wallace.portfolio.mappers;

import java.util.List;

import br.com.wallace.portfolio.dtos.ExperienceResponseDTO;
import br.com.wallace.portfolio.dtos.requests.ExperienceRequestDTO;
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
                experience.getCompanyUrl());
    }

    public static void updateEntityFromDTO(ExperienceRequestDTO dto, Experience entity) {
        if (dto == null || entity == null) {
            return;
        }

        if (dto.company() != null)
            entity.setCompany(dto.company());
        if (dto.position() != null)
            entity.setPosition(dto.position());
        if (dto.description() != null)
            entity.setDescription(dto.description());
        if (dto.startDate() != null)
            entity.setStartDate(dto.startDate());
        if (dto.endDate() != null)
            entity.setEndDate(dto.endDate());
        if (dto.current() != null)
            entity.setCurrent(Boolean.TRUE.equals(dto.current()));
        if (dto.location() != null)
            entity.setLocation(dto.location());
        if (dto.type() != null)
            entity.setType(dto.type());
        if (dto.technologies() != null)
            entity.setTechnologies(dto.technologies());
        if (dto.companyLogo() != null)
            entity.setCompanyLogo(dto.companyLogo());
        if (dto.companyUrl() != null)
            entity.setCompanyUrl(dto.companyUrl());
    }

    public static Experience toEntity(ExperienceRequestDTO dto) {
        if (dto == null) {
            throw new ExperienceNotFoundException("Experience Not Found");
        }

        Experience experience = new Experience();
        experience.setCompany(dto.company());
        experience.setPosition(dto.position());
        experience.setDescription(dto.description());
        experience.setStartDate(dto.startDate());
        experience.setEndDate(dto.endDate());
        experience.setCurrent(dto.current());
        experience.setLocation(dto.location());
        experience.setType(dto.type());
        experience.setTechnologies(dto.technologies());
        experience.setCompanyLogo(dto.companyLogo());
        experience.setCompanyUrl(dto.companyUrl());

        return experience;
    }
}