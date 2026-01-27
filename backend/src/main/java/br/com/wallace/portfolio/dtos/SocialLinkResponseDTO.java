package br.com.wallace.portfolio.dtos;

public record SocialLinkResponseDTO(
    Long id,
    String name,
    String url,
    String icon,
    String color
) {
}