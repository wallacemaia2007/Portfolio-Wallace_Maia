package br.com.wallace.portfolio.mappers;

import br.com.wallace.portfolio.dtos.EducationResponseDTO;
import br.com.wallace.portfolio.model.entities.Education;

public class EducationMapper {

    public static EducationResponseDTO toResponse(Education education) {
        if (education == null) {
            return null;
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
}
