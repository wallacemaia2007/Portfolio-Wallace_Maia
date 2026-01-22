package br.com.wallace.portfolio.dtos;

public record SocialLinkResponseDTO(
    Long id,
    String name,
    String linkUrl,
    String iconUrl,
    Long profileId
) {
}