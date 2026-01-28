package br.com.wallace.portfolio.mappers;

import br.com.wallace.portfolio.dtos.ValueResponseDTO;
import br.com.wallace.portfolio.dtos.requests.ValueRequestDTO;
import br.com.wallace.portfolio.exceptions.ValueNotFoundException;
import br.com.wallace.portfolio.model.entities.Value;

public class ValueMapper {

    public static ValueResponseDTO toResponse(Value value) {
        if (value == null) {
            throw new ValueNotFoundException("Value Not Found");
        }

        return new ValueResponseDTO(
                value.getId(),
                value.getTitle(),
                value.getDescription()
        );
    }

    public static void updateEntityFromDTO(ValueRequestDTO dto, Value entity) {
        if (dto == null || entity == null) {
            return;
        }

        if (dto.title() != null)
            entity.setTitle(dto.title());
        if (dto.description() != null)
            entity.setDescription(dto.description());
    }

    public static Value toEntity(ValueRequestDTO dto) {
        if (dto == null) {
            throw new ValueNotFoundException("Value Not Found");
        }

        Value value = new Value();
        value.setTitle(dto.title());
        value.setDescription(dto.description());

        return value;
    }
}
