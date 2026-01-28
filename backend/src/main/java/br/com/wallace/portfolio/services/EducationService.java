package br.com.wallace.portfolio.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.wallace.portfolio.dtos.EducationResponseDTO;
import br.com.wallace.portfolio.dtos.requests.EducationRequestDTO;
import br.com.wallace.portfolio.exceptions.EducationNotFoundException;
import br.com.wallace.portfolio.mappers.EducationMapper;
import br.com.wallace.portfolio.model.entities.Education;
import br.com.wallace.portfolio.model.repository.EducationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EducationService {

    private final EducationRepository educationRepository;

    @Transactional
    public List<EducationResponseDTO> getAllEducation() {
        return educationRepository.findAll().stream()
                .map(EducationMapper::toResponse)
                .toList();
    }

    @Transactional
    public EducationResponseDTO getEducationById(Long id) {
        Education education = educationRepository.findById(id)
                .orElseThrow(() -> new EducationNotFoundException("Education not found with id: " + id));

        return EducationMapper.toResponse(education);
    }

    @Transactional
    public EducationResponseDTO createEducation(EducationRequestDTO request) {
        Education education = EducationMapper.toEntity(request);
        return EducationMapper.toResponse(educationRepository.save(education));
    }

    @Transactional
    public EducationResponseDTO updateEducation(Long id, EducationRequestDTO request) {
        Education education = educationRepository.findById(id)
                .orElseThrow(() -> new EducationNotFoundException("Education not found with id: " + id));

        EducationMapper.updateEntityFromDTO(request, education);
        return EducationMapper.toResponse(educationRepository.save(education));
    }

    @Transactional
    public void deleteEducation(Long id) {
        if (!educationRepository.existsById(id)) {
            throw new EducationNotFoundException("Education not found with id: " + id);
        }
        educationRepository.deleteById(id);
    }

}
