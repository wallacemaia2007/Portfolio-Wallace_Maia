package br.com.wallace.portfolio.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.wallace.portfolio.dtos.EducationResponseDTO;
import br.com.wallace.portfolio.dtos.HobbyResponseDTO;
import br.com.wallace.portfolio.dtos.JourneyItemResponseDTO;
import br.com.wallace.portfolio.dtos.ValueResponseDTO;
import br.com.wallace.portfolio.mappers.EducationMapper;
import br.com.wallace.portfolio.mappers.HobbyMapper;
import br.com.wallace.portfolio.mappers.JourneyItemMapper;
import br.com.wallace.portfolio.mappers.ValueMapper;
import br.com.wallace.portfolio.model.repository.EducationRepository;
import br.com.wallace.portfolio.model.repository.HobbyRepository;
import br.com.wallace.portfolio.model.repository.JourneyItemRepository;
import br.com.wallace.portfolio.model.repository.ValueRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PortfolioService {

    private final EducationRepository educationRepository;
    private final HobbyRepository hobbyRepository;
    private final JourneyItemRepository journeyItemRepository;
    private final ValueRepository valueRepository;

    public List<EducationResponseDTO> getAllEducation() {
        return educationRepository.findAll().stream()
                .map(EducationMapper::toResponse)
                .toList();
    }

    public List<HobbyResponseDTO> getAllHobbies() {
        return hobbyRepository.findAll().stream()
                .map(HobbyMapper::toResponse)
                .toList();
    }

    public List<JourneyItemResponseDTO> getAllJourneyItems() {
        return journeyItemRepository.findAll().stream()
                .map(JourneyItemMapper::toResponse)
                .toList();
    }

    public List<ValueResponseDTO> getAllValues() {
        return valueRepository.findAll().stream()
                .map(ValueMapper::toResponse)
                .toList();
    }
}