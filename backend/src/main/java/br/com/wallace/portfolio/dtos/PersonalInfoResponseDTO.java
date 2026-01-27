package br.com.wallace.portfolio.dtos;

public record PersonalInfoResponseDTO(
        Integer id,
        String fullName,
        String acronym,
        String role,
        String email,
        String phone,
        String location,
        String bio,
        String avatar,
        String cvUrl,
        String github,
        String linkedin,
        String website) {
}
