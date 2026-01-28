package br.com.wallace.portfolio.services;

import org.springframework.stereotype.Service;

import br.com.wallace.portfolio.dtos.StatisticResponseDTO;
import br.com.wallace.portfolio.dtos.requests.StatisticRequestDTO;
import br.com.wallace.portfolio.exceptions.StatisticAlreadyExistsException;
import br.com.wallace.portfolio.exceptions.StatisticNotFoundException;
import br.com.wallace.portfolio.mappers.StatisticMapper;
import br.com.wallace.portfolio.model.entities.Statistics;
import br.com.wallace.portfolio.model.repository.StatisticRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StatisticService {

    private static final Long ID = 1L;
    private final StatisticRepository statisticRepository;

    private Statistics getStatisticsEntity() {
        return statisticRepository.findById(ID)
                .orElseThrow(() -> new StatisticNotFoundException("Personal info not found with id: 1"));
    }

    @Transactional
    public StatisticResponseDTO getStatistic() {
        return StatisticMapper.toResponse(getStatisticsEntity());
    }

    @Transactional
    public StatisticResponseDTO createStatistic(StatisticRequestDTO request) {

        if (statisticRepository.existsById(ID)) {
            throw new StatisticAlreadyExistsException("Statistic already exists. Only one instance is allowed.");
        }

        Statistics statistic = StatisticMapper.toEntity(request);
        return StatisticMapper.toResponse(statisticRepository.save(statistic));
    }

    @Transactional
    public StatisticResponseDTO updateStatistic(StatisticRequestDTO request) {
        Statistics statistic = getStatisticsEntity();
        StatisticMapper.updateEntityFromDTO(request, statistic);
        return StatisticMapper.toResponse(statisticRepository.save(statistic));
    }

    @Transactional
    public void deleteStatistic() {
        if (!statisticRepository.existsById(ID)) {
            throw new StatisticNotFoundException("Statistic not found");
        }
        statisticRepository.deleteById(ID);
    }

}
