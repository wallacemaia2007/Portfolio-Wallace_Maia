package br.com.wallace.portfolio.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.wallace.portfolio.dtos.HobbyResponseDTO;
import br.com.wallace.portfolio.dtos.requests.HobbyRequestDTO;
import br.com.wallace.portfolio.exceptions.HobbyNotFoundException;
import br.com.wallace.portfolio.mappers.HobbyMapper;
import br.com.wallace.portfolio.model.entities.Hobby;
import br.com.wallace.portfolio.model.repository.HobbyRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HobbyService {
    private final HobbyRepository hobbyRepository;

    @Transactional
    public List<HobbyResponseDTO> getAllHobbies() {
        return hobbyRepository.findAll().stream()
                .map(HobbyMapper::toResponse)
                .toList();
    }

    @Transactional
    public HobbyResponseDTO getHobbyById(Long id) {
        Hobby hobby = hobbyRepository.findById(id)
                .orElseThrow(() -> new HobbyNotFoundException("Hobby not found with id: " + id));

        return HobbyMapper.toResponse(hobby);
    }

    @Transactional
    public HobbyResponseDTO createHobby(HobbyRequestDTO request) {
        Hobby hobby = HobbyMapper.toEntity(request);
        return HobbyMapper.toResponse(hobbyRepository.save(hobby));
    }

    @Transactional
    public HobbyResponseDTO updateHobby(Long id, HobbyRequestDTO request) {
        Hobby hobby = hobbyRepository.findById(id)
                .orElseThrow(() -> new HobbyNotFoundException("Hobby not found with id: " + id));

        HobbyMapper.updateEntityFromDTO(request, hobby);
        return HobbyMapper.toResponse(hobbyRepository.save(hobby));
    }

    @Transactional
    public void deleteHobby(Long id) {
        if (!hobbyRepository.existsById(id)) {
            throw new HobbyNotFoundException("Hobby not found with id: " + id);
        }
        hobbyRepository.deleteById(id);
    }

}
