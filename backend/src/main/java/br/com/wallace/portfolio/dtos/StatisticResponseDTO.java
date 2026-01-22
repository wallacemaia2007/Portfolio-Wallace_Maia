package br.com.wallace.portfolio.dtos;

public record StatisticResponseDTO(
    Long id,
    int totalProjects,
    int completedProjects,
    int happyClients,
    int yearsExperience,
    int technologies,
    int coffeesCups,
    Long profileId
) {
}