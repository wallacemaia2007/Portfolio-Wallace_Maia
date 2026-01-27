package br.com.wallace.portfolio.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.wallace.portfolio.dtos.StatisticResponseDTO;
import br.com.wallace.portfolio.mappers.StatisticMapper;
import br.com.wallace.portfolio.model.repository.StatisticRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StatisticService {

    private final StatisticRepository statisticRepository;

    public List<StatisticResponseDTO> getAllStatistics() {
        return statisticRepository.findAll().stream()
                .map(StatisticMapper::toResponse)
                .toList();
    }

}
