package br.com.wallace.portfolio.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.wallace.portfolio.dtos.HobbyResponseDTO;
import br.com.wallace.portfolio.dtos.JourneyItemResponseDTO;
import br.com.wallace.portfolio.dtos.ValueResponseDTO;
import br.com.wallace.portfolio.mappers.HobbyMapper;
import br.com.wallace.portfolio.mappers.JourneyItemMapper;
import br.com.wallace.portfolio.mappers.ValueMapper;
import br.com.wallace.portfolio.model.repository.HobbyRepository;
import br.com.wallace.portfolio.model.repository.JourneyItemRepository;
import br.com.wallace.portfolio.model.repository.ValueRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PortfolioService {

    private final HobbyRepository hobbyRepository;
    private final JourneyItemRepository journeyItemRepository;
    private final ValueRepository valueRepository;

    
//-------------------------------------------------------------------------------------------------------------------

    @Transactional
    public List<HobbyResponseDTO> getAllHobbies() {
        return hobbyRepository.findAll().stream()
                .map(HobbyMapper::toResponse)
                .toList();
    }

    @Transactional
    public List<JourneyItemResponseDTO> getAllJourneyItems() {
        return journeyItemRepository.findAll().stream()
                .map(JourneyItemMapper::toResponse)
                .toList();
    }

    @Transactional
    public List<ValueResponseDTO> getAllValues() {
        return valueRepository.findAll().stream()
                .map(ValueMapper::toResponse)
                .toList();
    }
}