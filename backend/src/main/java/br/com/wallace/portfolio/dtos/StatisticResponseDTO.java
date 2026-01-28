package br.com.wallace.portfolio.dtos;

public record StatisticResponseDTO(
    Long id,
    Integer totalProjects,
    Integer completedProjects,
    Integer happyClients,
    Integer yearsExperience,
    Integer technologies
) {
}