package br.com.wallace.portfolio.mappers;

import br.com.wallace.portfolio.dtos.StatisticResponseDTO;
import br.com.wallace.portfolio.exceptions.StatisticNotFoundException;
import br.com.wallace.portfolio.model.entities.Statistics;

public class StatisticMapper {

    public static StatisticResponseDTO toResponse(Statistics statistic) {
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
                statistic.getCoffeesCups()
        );
    }
}