package br.com.wallace.portfolio.dtos;

public record JourneyItemResponseDTO(
        Long id,
        String year,
        String title,
        String description,
        String type,
        String icon) {
}
