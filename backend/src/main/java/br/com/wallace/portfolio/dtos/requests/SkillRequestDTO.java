package br.com.wallace.portfolio.dtos.requests;

public record SkillRequestDTO(
        String name,
        String category,
        Integer level,
        Integer yearsOfExperience,
        String icon,
        String color) {

}
