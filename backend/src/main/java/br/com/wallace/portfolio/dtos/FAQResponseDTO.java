package br.com.wallace.portfolio.dtos;

public record FAQResponseDTO(
        String id,
        String question,
        String answer,
        String category,
        Integer order,
        String icon) {
}
