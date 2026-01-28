package br.com.wallace.portfolio.mappers;

import br.com.wallace.portfolio.dtos.JourneyItemResponseDTO;
import br.com.wallace.portfolio.dtos.requests.JourneyItemRequestDTO;
import br.com.wallace.portfolio.exceptions.JourneyItemNotFoundException;
import br.com.wallace.portfolio.model.entities.JourneyItem;

public class JourneyItemMapper {

    public static JourneyItemResponseDTO toResponse(JourneyItem journeyItem) {
        if (journeyItem == null) {
            throw new JourneyItemNotFoundException("Journey Item Not Found");
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

    public static void updateEntityFromDTO(JourneyItemRequestDTO dto, JourneyItem entity) {
        if (dto == null || entity == null) {
            return;
        }

        if (dto.year() != null)
            entity.setYear(dto.year());
        if (dto.title() != null)
            entity.setTitle(dto.title());
        if (dto.description() != null)
            entity.setDescription(dto.description());
        if (dto.type() != null)
            entity.setType(dto.type());
        if (dto.icon() != null)
            entity.setIcon(dto.icon());
    }

    public static JourneyItem toEntity(JourneyItemRequestDTO dto) {
        if (dto == null) {
            throw new JourneyItemNotFoundException("Journey Item Not Found");
        }

        JourneyItem journeyItem = new JourneyItem();
        journeyItem.setYear(dto.year());
        journeyItem.setTitle(dto.title());
        journeyItem.setDescription(dto.description());
        journeyItem.setType(dto.type());
        journeyItem.setIcon(dto.icon());

        return journeyItem;
    }
}
