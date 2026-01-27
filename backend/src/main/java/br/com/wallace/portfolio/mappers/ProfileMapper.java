package br.com.wallace.portfolio.mappers;

import org.springframework.stereotype.Component;

import br.com.wallace.portfolio.dtos.PersonalInfoResponseDTO;
import br.com.wallace.portfolio.model.entities.PersonalInfo;

@Component
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
                profile.getWebsite()
        );
    }
}
