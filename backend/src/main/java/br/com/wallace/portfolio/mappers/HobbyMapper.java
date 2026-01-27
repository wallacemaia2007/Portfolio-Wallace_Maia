package br.com.wallace.portfolio.mappers;

import br.com.wallace.portfolio.dtos.HobbyResponseDTO;
import br.com.wallace.portfolio.model.entities.Hobby;

public class HobbyMapper {

    public static HobbyResponseDTO toResponse(Hobby hobby) {
        if (hobby == null) {
            return null;
        }

        return new HobbyResponseDTO(
                hobby.getId(),
                hobby.getName(),
                hobby.getDescription(),
                hobby.getEmoji()
        );
    }
}
