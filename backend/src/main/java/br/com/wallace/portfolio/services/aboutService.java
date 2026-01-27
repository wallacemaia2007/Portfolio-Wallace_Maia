package br.com.wallace.portfolio.services;

import org.springframework.stereotype.Service;

import br.com.wallace.portfolio.dtos.AboutResponseDTO;
import br.com.wallace.portfolio.mappers.AboutMapper;
import br.com.wallace.portfolio.model.entities.About;
import br.com.wallace.portfolio.model.repository.AboutRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class aboutService {

    private final AboutRepository aboutRepository;

    public AboutResponseDTO getAbout() {
        About about = aboutRepository.findAll().stream().findFirst().orElse(null);
        return AboutMapper.toResponse(about);
    }
}
