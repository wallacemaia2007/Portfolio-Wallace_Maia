package br.com.wallace.portfolio.dtos.requests;

public record TestimonialRequestDTO(
        String author,
        String role,
        String company,
        String text,
        String avatar,
        Integer rating) {
}
