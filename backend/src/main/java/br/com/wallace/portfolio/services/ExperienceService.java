package br.com.wallace.portfolio.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.wallace.portfolio.dtos.ExperienceResponseDTO;
import br.com.wallace.portfolio.mappers.ExperienceMapper;
import br.com.wallace.portfolio.model.repository.ExperienceRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExperienceService {

    private final ExperienceRepository experienceRepository;

    public List<ExperienceResponseDTO> getAllExperiences() {
        return experienceRepository.findAll().stream()
                .map(ExperienceMapper::toResponse)
                .toList();
    }

}
