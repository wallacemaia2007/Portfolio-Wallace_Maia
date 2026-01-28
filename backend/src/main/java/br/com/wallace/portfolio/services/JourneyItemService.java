package br.com.wallace.portfolio.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.wallace.portfolio.dtos.JourneyItemResponseDTO;
import br.com.wallace.portfolio.dtos.requests.JourneyItemRequestDTO;
import br.com.wallace.portfolio.exceptions.JourneyItemNotFoundException;
import br.com.wallace.portfolio.mappers.JourneyItemMapper;
import br.com.wallace.portfolio.model.entities.JourneyItem;
import br.com.wallace.portfolio.model.repository.JourneyItemRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JourneyItemService {

    private final JourneyItemRepository journeyItemRepository;

    @Transactional
    public List<JourneyItemResponseDTO> getAllJourneyItems() {
        return journeyItemRepository.findAll().stream()
                .map(JourneyItemMapper::toResponse)
                .toList();
    }

    @Transactional
    public JourneyItemResponseDTO createJourneyItem(JourneyItemRequestDTO request) {
        JourneyItem journeyItem = JourneyItemMapper.toEntity(request);
        return JourneyItemMapper.toResponse(journeyItemRepository.save(journeyItem));
    }

    @Transactional
    public JourneyItemResponseDTO updateJourneyItem(Long id, JourneyItemRequestDTO request) {
        JourneyItem journeyItem = journeyItemRepository.findById(id)
                .orElseThrow(() -> new JourneyItemNotFoundException("Journey Item not found with id: " + id));

        JourneyItemMapper.updateEntityFromDTO(request, journeyItem);
        return JourneyItemMapper.toResponse(journeyItemRepository.save(journeyItem));
    }

    @Transactional
    public void deleteJourneyItem(Long id) {
        if (!journeyItemRepository.existsById(id)) {
            throw new JourneyItemNotFoundException("Journey Item not found with id: " + id);
        }
        journeyItemRepository.deleteById(id);
    }

}
