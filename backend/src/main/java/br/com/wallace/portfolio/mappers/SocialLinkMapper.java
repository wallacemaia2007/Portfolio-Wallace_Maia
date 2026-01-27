package br.com.wallace.portfolio.mappers;

import br.com.wallace.portfolio.dtos.SocialLinkResponseDTO;
import br.com.wallace.portfolio.exceptions.SocialLinkNotFoundException;
import br.com.wallace.portfolio.model.entities.SocialLink;

public class SocialLinkMapper {

    public static SocialLinkResponseDTO toResponse(SocialLink socialLink) {
        if (socialLink == null) {
            throw new SocialLinkNotFoundException("Social Link Not Found");
        }

        return new SocialLinkResponseDTO(
                socialLink.getId(),
                socialLink.getName(),
                socialLink.getUrl(),
                socialLink.getIcon(),
                socialLink.getColor()
        );
    }
}