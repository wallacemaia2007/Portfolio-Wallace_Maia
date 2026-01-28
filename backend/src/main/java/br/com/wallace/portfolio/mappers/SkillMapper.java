package br.com.wallace.portfolio.mappers;

import br.com.wallace.portfolio.dtos.SkillResponseDTO;
import br.com.wallace.portfolio.dtos.requests.SkillRequestDTO;
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

    public static void updateEntityFromDTO(SkillRequestDTO dto, Skill entity) {
        if (dto == null || entity == null) {
            return;
        }

        if (dto.name() != null)
            entity.setName(dto.name());
        if (dto.category() != null)
            entity.setCategory(dto.category());
        if (dto.level() != null)
            entity.setLevel(dto.level());
        if (dto.yearsOfExperience() != null)
            entity.setYearsOfExperience(dto.yearsOfExperience());
        if (dto.icon() != null)
            entity.setIcon(dto.icon());
        if (dto.color() != null)
            entity.setColor(dto.color());
    }

    public static Skill toEntity(SkillRequestDTO dto) {
        if (dto == null) {
            throw new SkillNotFoundException("Skill Not Found");
        }

        Skill skill = new Skill();
        skill.setName(dto.name());
        skill.setCategory(dto.category());
        skill.setLevel(dto.level());
        skill.setYearsOfExperience(dto.yearsOfExperience());
        skill.setIcon(dto.icon());
        skill.setColor(dto.color());

        return skill;
    }
}