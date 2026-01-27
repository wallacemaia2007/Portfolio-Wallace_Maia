package br.com.wallace.portfolio.mappers;

import br.com.wallace.portfolio.dtos.ValueResponseDTO;
import br.com.wallace.portfolio.model.entities.Value;

public class ValueMapper {

    public static ValueResponseDTO toResponse(Value value) {
        if (value == null) {
            return null;
        }

        return new ValueResponseDTO(
                value.getId(),
                value.getTitle(),
                value.getDescription()
        );
    }
}
