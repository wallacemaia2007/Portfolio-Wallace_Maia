package br.com.wallace.portfolio.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.wallace.portfolio.dtos.ValueResponseDTO;
import br.com.wallace.portfolio.dtos.requests.ValueRequestDTO;
import br.com.wallace.portfolio.exceptions.ValueNotFoundException;
import br.com.wallace.portfolio.mappers.ValueMapper;
import br.com.wallace.portfolio.model.entities.Value;
import br.com.wallace.portfolio.model.repository.ValueRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ValueService {

    private final ValueRepository valueRepository;

    @Transactional
    public List<ValueResponseDTO> getAllValues() {
        return valueRepository.findAll().stream()
                .map(ValueMapper::toResponse)
                .toList();
    }

    @Transactional
    public ValueResponseDTO createValue(ValueRequestDTO request) {
        Value value = ValueMapper.toEntity(request);
        return ValueMapper.toResponse(valueRepository.save(value));
    }

    @Transactional
    public ValueResponseDTO updateValue(Long id, ValueRequestDTO request) {
        Value value = valueRepository.findById(id)
                .orElseThrow(() -> new ValueNotFoundException("Value not found with id: " + id));

        ValueMapper.updateEntityFromDTO(request, value);
        return ValueMapper.toResponse(valueRepository.save(value));
    }

    @Transactional
    public void deleteValue(Long id) {
        if (!valueRepository.existsById(id)) {
            throw new ValueNotFoundException("Value not found with id: " + id);
        }
        valueRepository.deleteById(id);
    }

}
