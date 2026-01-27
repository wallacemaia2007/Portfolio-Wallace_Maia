package br.com.wallace.portfolio.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.wallace.portfolio.dtos.SkillResponseDTO;
import br.com.wallace.portfolio.mappers.SkillMapper;
import br.com.wallace.portfolio.model.repository.SkillRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SkillsService {

    private final SkillRepository skillRepository;

    public List<SkillResponseDTO> getAllSkills() {
        return skillRepository.findAll().stream()
                .map(SkillMapper::toResponse)
                .toList();
    }

}
