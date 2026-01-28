package br.com.wallace.portfolio.dtos.requests;

public record JourneyItemRequestDTO(
        String year,
        String title,
        String description,
        String type,
        String icon) {

}
