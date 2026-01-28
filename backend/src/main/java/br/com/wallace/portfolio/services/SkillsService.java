package br.com.wallace.portfolio.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.wallace.portfolio.dtos.SkillResponseDTO;
import br.com.wallace.portfolio.dtos.requests.SkillRequestDTO;
import br.com.wallace.portfolio.exceptions.SkillNotFoundException;
import br.com.wallace.portfolio.mappers.SkillMapper;
import br.com.wallace.portfolio.model.entities.Skill;
import br.com.wallace.portfolio.model.repository.SkillRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SkillsService {

    private final SkillRepository skillRepository;

    @Transactional
    public List<SkillResponseDTO> getAllSkills(String category) {

        List<Skill> skills;

        if (category != null && !category.isBlank()) {
            skills = skillRepository.findByCategoryIgnoreCase(category);
        } else {
            skills = skillRepository.findAll();
        }

        return skills.stream()
                .map(SkillMapper::toResponse)
                .toList();
    }


    @Transactional
    public SkillResponseDTO getSkillById(Long id) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new SkillNotFoundException("Skill not found with id: " + id));

        return SkillMapper.toResponse(skill);
    }

    @Transactional
    public SkillResponseDTO createSkill(SkillRequestDTO request) {
        Skill skill = SkillMapper.toEntity(request);
        return SkillMapper.toResponse(skillRepository.save(skill));
    }

    @Transactional
    public SkillResponseDTO updateSkill(Long id, SkillRequestDTO request) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new SkillNotFoundException("Skill not found with id: " + id));

        SkillMapper.updateEntityFromDTO(request, skill);
        return SkillMapper.toResponse(skillRepository.save(skill));
    }

    @Transactional
    public void deleteSkill(Long id) {
        if (!skillRepository.existsById(id)) {
            throw new SkillNotFoundException("Skill not found with id: " + id);
        }
        skillRepository.deleteById(id);
    }

}
