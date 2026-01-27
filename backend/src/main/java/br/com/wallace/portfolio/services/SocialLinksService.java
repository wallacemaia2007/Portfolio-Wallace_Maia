package br.com.wallace.portfolio.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.wallace.portfolio.dtos.SocialLinkResponseDTO;
import br.com.wallace.portfolio.mappers.SocialLinkMapper;
import br.com.wallace.portfolio.model.repository.SocialLinkRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SocialLinksService {

    private final SocialLinkRepository socialLinkRepository;

    public List<SocialLinkResponseDTO> getAllSocialLinks() {
        return socialLinkRepository.findAll().stream()
                .map(SocialLinkMapper::toResponse)
                .toList();
    }
}
