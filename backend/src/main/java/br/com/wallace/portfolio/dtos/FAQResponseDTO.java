package br.com.wallace.portfolio.dtos;

public record FAQResponseDTO(
        Long id,
        String question,
        String answer,
        String category,
        Integer order,
        String icon) {
}
