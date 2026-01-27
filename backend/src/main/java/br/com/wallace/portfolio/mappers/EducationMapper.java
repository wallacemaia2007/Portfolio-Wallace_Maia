package br.com.wallace.portfolio.mappers;

import br.com.wallace.portfolio.dtos.EducationResponseDTO;
import br.com.wallace.portfolio.dtos.requests.EducationRequestDTO;
import br.com.wallace.portfolio.exceptions.EducationNotFoundException;
import br.com.wallace.portfolio.model.entities.Education;

public class EducationMapper {


    public static EducationResponseDTO toResponse(Education education) {
        if (education == null) {
            throw new EducationNotFoundException("Education Not Found");
        }
        return new EducationResponseDTO(
                education.getId(),
                education.getInstitution(),
                education.getCourse(),
                education.getStartDate(),
                education.getEndDate(),
                education.isCurrent(),
                education.getDescription(),
                education.getLocation(),
                education.getCertificateUrl()
        );
    }


    public static void updateEntityFromDTO(EducationRequestDTO dto, Education entity) {
        if (dto == null || entity == null) {
            return;
        }

        if (dto.institution() != null)
            entity.setInstitution(dto.institution());
        if (dto.course() != null)
            entity.setCourse(dto.course());
        if (dto.startDate() != null)
            entity.setStartDate(dto.startDate());
        if (dto.endDate() != null)
            entity.setEndDate(dto.endDate());
        if (dto.current() != null)
            entity.setCurrent(Boolean.TRUE.equals(dto.current()));
        if (dto.description() != null)
            entity.setDescription(dto.description());
        if (dto.location() != null)
            entity.setLocation(dto.location());
        if (dto.certificateUrl() != null)
            entity.setCertificateUrl(dto.certificateUrl());
    }


    public static Education toEntity(EducationRequestDTO dto) {
        if (dto == null) {
            throw new RuntimeException("Education Not Found");
        }

        Education education = new Education();
        education.setInstitution(dto.institution());
        education.setCourse(dto.course());
        education.setStartDate(dto.startDate());
        education.setEndDate(dto.endDate());
        education.setCurrent(Boolean.TRUE.equals(dto.current()));
        education.setDescription(dto.description());
        education.setLocation(dto.location());
        education.setCertificateUrl(dto.certificateUrl());

        return education;
    }

}
