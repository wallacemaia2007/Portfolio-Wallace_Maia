package br.com.wallace.portfolio.mappers;

import br.com.wallace.portfolio.dtos.JourneyItemResponseDTO;
import br.com.wallace.portfolio.model.entities.JourneyItem;

public class JourneyItemMapper {

    public static JourneyItemResponseDTO toResponse(JourneyItem journeyItem) {
        if (journeyItem == null) {
            return null;
        }

        return new JourneyItemResponseDTO(
                journeyItem.getId(),
                journeyItem.getYear(),
                journeyItem.getTitle(),
                journeyItem.getDescription(),
                journeyItem.getType(),
                journeyItem.getIcon()
        );
    }
}
