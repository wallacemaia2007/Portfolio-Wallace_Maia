package br.com.wallace.portfolio.mappers;

import br.com.wallace.portfolio.dtos.StatisticResponseDTO;
import br.com.wallace.portfolio.exceptions.StatisticNotFoundException;
import br.com.wallace.portfolio.model.entitites.Statistic;

public class StatisticMapper {

    public static StatisticResponseDTO toResponse(Statistic statistic) {
        if (statistic == null) {
            throw new StatisticNotFoundException("Statistic Not Found");
        }

        return new StatisticResponseDTO(
                statistic.getId(),
                statistic.getTotalProjects(),
                statistic.getCompletedProjects(),
                statistic.getHappyClients(),
                statistic.getYearsExperience(),
                statistic.getTechnologies(),
                statistic.getCoffeesCups(),
                statistic.getProfile() != null ? statistic.getProfile().getId() : null
        );
    }
}