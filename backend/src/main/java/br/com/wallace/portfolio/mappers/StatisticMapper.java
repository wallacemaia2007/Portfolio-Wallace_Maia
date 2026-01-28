package br.com.wallace.portfolio.mappers;

import br.com.wallace.portfolio.dtos.StatisticResponseDTO;
import br.com.wallace.portfolio.dtos.requests.StatisticRequestDTO;
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
                statistic.getTechnologies()
        );
    }

    public static void updateEntityFromDTO(StatisticRequestDTO dto, Statistics entity) {
        if (dto == null || entity == null) {
            return;
        }

        if (dto.totalProjects() != null)
            entity.setTotalProjects(dto.totalProjects());
        if (dto.completedProjects() != null)
            entity.setCompletedProjects(dto.completedProjects());
        if (dto.happyClients() != null)
            entity.setHappyClients(dto.happyClients());
        if (dto.yearsExperience() != null)
            entity.setYearsExperience(dto.yearsExperience());
        if (dto.technologies() != null)
            entity.setTechnologies(dto.technologies());
    }

    public static Statistics toEntity(StatisticRequestDTO dto) {
        if (dto == null) {
            throw new StatisticNotFoundException("Statistic Not Found");
        }

        Statistics statistics = new Statistics();
        statistics.setTotalProjects(dto.totalProjects());
        statistics.setCompletedProjects(dto.completedProjects());
        statistics.setHappyClients(dto.happyClients());
        statistics.setYearsExperience(dto.yearsExperience());
        statistics.setTechnologies(dto.technologies());

        return statistics;
    }
}