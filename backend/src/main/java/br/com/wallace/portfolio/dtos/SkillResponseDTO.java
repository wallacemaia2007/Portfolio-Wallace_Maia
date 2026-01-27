package br.com.wallace.portfolio.dtos;

public record SkillResponseDTO(
        String id,
        String name,
        String category,
        Integer level,
        Integer yearsOfExperience,
        String icon,
        String color) {
}