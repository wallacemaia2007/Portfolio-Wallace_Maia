package br.com.wallace.portfolio.dtos;

public record ProfileResponseDTO(Long id,
        String fullName, String acronym, String role, String email, String phone, String location, String bio,
        String avatar, String cvUrl, String githubUrl, String linkedinUrl, String websiteUrl) {
}
