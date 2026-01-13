package br.com.wallace.portfolio.mappers;

import org.springframework.stereotype.Component;

import br.com.wallace.portfolio.dtos.ProfileResponseDTO;
import br.com.wallace.portfolio.model.entitites.Profile;

@Component
public class ProfileMapper {

    public static ProfileResponseDTO toResponse(Profile profile) {
        return new ProfileResponseDTO(profile.getId(), profile.getFullName(), profile.getAcronym(), profile.getRole(),
                profile.getEmail(), profile.getPhone(), profile.getLocation(), profile.getBio(), profile.getAvatar(),
                profile.getCvUrl(), profile.getGithubUrl(), profile.getLinkedinUrl(), profile.getWebsiteUrl());
    }
}
