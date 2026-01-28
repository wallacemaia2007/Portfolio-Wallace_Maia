package br.com.wallace.portfolio.mappers;

import br.com.wallace.portfolio.dtos.HobbyResponseDTO;
import br.com.wallace.portfolio.dtos.requests.HobbyRequestDTO;
import br.com.wallace.portfolio.exceptions.HobbyNotFoundException;
import br.com.wallace.portfolio.model.entities.Hobby;

public class HobbyMapper {

    public static HobbyResponseDTO toResponse(Hobby hobby) {
        if (hobby == null) {
            throw new HobbyNotFoundException("Hobby Not Found");
        }

        return new HobbyResponseDTO(
                hobby.getId(),
                hobby.getName(),
                hobby.getDescription(),
                hobby.getEmoji()
        );
    }

    public static void updateEntityFromDTO(HobbyRequestDTO dto, Hobby entity) {
        if (dto == null || entity == null) {
            return;
        }

        if (dto.name() != null)
            entity.setName(dto.name());
        if (dto.description() != null)
            entity.setDescription(dto.description());
        if (dto.emoji() != null)
            entity.setEmoji(dto.emoji());
    }

    public static Hobby toEntity(HobbyRequestDTO dto) {
        if (dto == null) {
            throw new HobbyNotFoundException("Hobby Not Found");
        }

        Hobby hobby = new Hobby();
        hobby.setName(dto.name());
        hobby.setDescription(dto.description());
        hobby.setEmoji(dto.emoji());

        return hobby;
    }
}
