package br.com.wallace.portfolio.mappers;

import br.com.wallace.portfolio.dtos.PersonalInfoResponseDTO;
import br.com.wallace.portfolio.dtos.requests.PersonalInfoRequestDTO;
import br.com.wallace.portfolio.model.entities.PersonalInfo;

public class ProfileMapper {

    public static PersonalInfoResponseDTO toResponse(PersonalInfo profile) {
        if (profile == null) {
            return null;
        }

        return new PersonalInfoResponseDTO(
                profile.getId(),
                profile.getFullName(),
                profile.getAcronym(),
                profile.getRole(),
                profile.getEmail(),
                profile.getPhone(),
                profile.getLocation(),
                profile.getBio(),
                profile.getAvatar(),
                profile.getCvUrl(),
                profile.getGithub(),
                profile.getLinkedin(),
                profile.getWebsite());
    }

    public static void updateEntityFromRequest(PersonalInfoRequestDTO dto, PersonalInfo entity) {
        if (dto == null || entity == null) {
            return;
        }

        if (dto.fullName() != null)
            entity.setFullName(dto.fullName());
        if (dto.acronym() != null)
            entity.setAcronym(dto.acronym());
        if (dto.role() != null)
            entity.setRole(dto.role());
        if (dto.email() != null)
            entity.setEmail(dto.email());
        if (dto.phone() != null)
            entity.setPhone(dto.phone());
        if (dto.location() != null)
            entity.setLocation(dto.location());
        if (dto.bio() != null)
            entity.setBio(dto.bio());
        if (dto.avatar() != null)
            entity.setAvatar(dto.avatar());
        if (dto.cvUrl() != null)
            entity.setCvUrl(dto.cvUrl());
        if (dto.github() != null)
            entity.setGithub(dto.github());
        if (dto.linkedin() != null)
            entity.setLinkedin(dto.linkedin());
        if (dto.website() != null)
            entity.setWebsite(dto.website());
    }

    public static PersonalInfo toEntity(PersonalInfoRequestDTO dto) {
        if (dto == null) {
            return null;
        }

        PersonalInfo personalInfo = new PersonalInfo();
        personalInfo.setFullName(dto.fullName());
        personalInfo.setAcronym(dto.acronym());
        personalInfo.setRole(dto.role());
        personalInfo.setEmail(dto.email());
        personalInfo.setPhone(dto.phone());
        personalInfo.setLocation(dto.location());
        personalInfo.setBio(dto.bio());
        personalInfo.setAvatar(dto.avatar());
        personalInfo.setCvUrl(dto.cvUrl());
        personalInfo.setGithub(dto.github());
        personalInfo.setLinkedin(dto.linkedin());
        personalInfo.setWebsite(dto.website());

        return personalInfo;
    }
}
