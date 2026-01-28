package br.com.wallace.portfolio.dtos.requests;

public record StatisticRequestDTO(
        Integer totalProjects,
        Integer completedProjects,
        Integer happyClients,
        Integer yearsExperience,
        Integer technologies) {

}
