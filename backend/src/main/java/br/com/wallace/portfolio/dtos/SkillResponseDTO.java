package br.com.wallace.portfolio.dtos;

public record SkillResponseDTO(Long id, String name, String category, int level, int yearsOfExperience, String icon,
        Long profileId) {
}