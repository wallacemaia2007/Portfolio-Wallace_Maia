package br.com.wallace.portfolio.mappers;

import br.com.wallace.portfolio.dtos.SkillResponseDTO;
import br.com.wallace.portfolio.exceptions.SkillNotFoundException;
import br.com.wallace.portfolio.model.entities.Skill;

public class SkillMapper {

    public static SkillResponseDTO toResponse(Skill skill) {
        if (skill == null) {
            throw new SkillNotFoundException("Skill Not Found");
        }

        return new SkillResponseDTO(
                skill.getId(),
                skill.getName(),
                skill.getCategory(),
                skill.getLevel(),
                skill.getYearsOfExperience(),
                skill.getIcon(),
                skill.getColor());
    }
}