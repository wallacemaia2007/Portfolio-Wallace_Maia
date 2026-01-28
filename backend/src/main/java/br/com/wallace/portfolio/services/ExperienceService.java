package br.com.wallace.portfolio.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.wallace.portfolio.dtos.ExperienceResponseDTO;
import br.com.wallace.portfolio.dtos.requests.ExperienceRequestDTO;
import br.com.wallace.portfolio.exceptions.ExperienceNotFoundException;
import br.com.wallace.portfolio.mappers.ExperienceMapper;
import br.com.wallace.portfolio.model.entities.Experience;
import br.com.wallace.portfolio.model.repository.ExperienceRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExperienceService {

    private final ExperienceRepository experienceRepository;

    @Transactional
    public List<ExperienceResponseDTO> getAllExperiences() {
        List<Experience> experiences = experienceRepository.findAll();
        return experiences.stream()
                .map(ExperienceMapper::toResponse)
                .toList();
    }

    @Transactional
    public ExperienceResponseDTO getExperienceById(Long id) {
        Experience experience = experienceRepository.findById(id)
                .orElseThrow(() -> new ExperienceNotFoundException("Experience not found with id: " + id));
        return ExperienceMapper.toResponse(experience);
    }

    @Transactional
    public ExperienceResponseDTO createExperience(ExperienceRequestDTO request) {
        Experience experience = ExperienceMapper.toEntity(request);
        return ExperienceMapper.toResponse(experienceRepository.save(experience));
    }

    @Transactional
    public ExperienceResponseDTO updateExperience(Long id, ExperienceRequestDTO request) {
        Experience experience = experienceRepository.findById(id)
                .orElseThrow(() -> new ExperienceNotFoundException("Experience not found with id: " + id));

        ExperienceMapper.updateEntityFromDTO(request, experience);
        return ExperienceMapper.toResponse(experienceRepository.save(experience));
    }

    @Transactional
    public void deleteExperience(Long id) {
        if (!experienceRepository.existsById(id)) {
            throw new ExperienceNotFoundException("Experience not found with id: " + id);
        }
        experienceRepository.deleteById(id);
    }
}