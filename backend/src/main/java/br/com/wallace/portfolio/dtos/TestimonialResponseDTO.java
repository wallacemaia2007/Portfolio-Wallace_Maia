package br.com.wallace.portfolio.dtos;

public record TestimonialResponseDTO(
        Long id,
        String author,
        String role,
        String company,
        String text,
        String avatar,
        Integer rating) {
}
