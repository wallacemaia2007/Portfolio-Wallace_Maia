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
                socialLink.getColor());
    }

    public static SocialLink toEntity(br.com.wallace.portfolio.dtos.requests.SocialLinkRequestDTO dto) {
        if (dto == null) {
            throw new SocialLinkNotFoundException("Social Link Not Found");
        }

        SocialLink socialLink = new SocialLink();
        socialLink.setName(dto.name());
        socialLink.setUrl(dto.url());
        socialLink.setIcon(dto.icon());
        socialLink.setColor(dto.color());

        return socialLink;
    }

    public static void updateEntityFromDTO(br.com.wallace.portfolio.dtos.requests.SocialLinkRequestDTO dto,
            SocialLink entity) {
        if (dto == null || entity == null) {
            return;
        }

        if (dto.name() != null)
            entity.setName(dto.name());
        if (dto.url() != null)
            entity.setUrl(dto.url());
        if (dto.icon() != null)
            entity.setIcon(dto.icon());
        if (dto.color() != null)
            entity.setColor(dto.color());
    }
}