package br.com.wallace.portfolio.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.wallace.portfolio.dtos.SocialLinkResponseDTO;
import br.com.wallace.portfolio.dtos.requests.SocialLinkRequestDTO;
import br.com.wallace.portfolio.exceptions.SocialLinkNotFoundException;
import br.com.wallace.portfolio.mappers.SocialLinkMapper;
import br.com.wallace.portfolio.model.entities.SocialLink;
import br.com.wallace.portfolio.model.repository.SocialLinkRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SocialLinksService {

    private final SocialLinkRepository socialLinkRepository;

    @Transactional
    public List<SocialLinkResponseDTO> getAllSocialLinks() {
        return socialLinkRepository.findAll().stream()
                .map(SocialLinkMapper::toResponse)
                .toList();
    }

    @Transactional
    public SocialLinkResponseDTO getSocialLinkById(Long id) {
        SocialLink socialLink = socialLinkRepository.findById(id)
                .orElseThrow(() -> new SocialLinkNotFoundException("Social Link not found with id: " + id));

        return SocialLinkMapper.toResponse(socialLink);
    }

    @Transactional
    public SocialLinkResponseDTO createSocialLink(SocialLinkRequestDTO request) {
        SocialLink socialLink = SocialLinkMapper.toEntity(request);
        return SocialLinkMapper.toResponse(socialLinkRepository.save(socialLink));
    }

    @Transactional
    public SocialLinkResponseDTO updateSocialLink(Long id, SocialLinkRequestDTO request) {
        SocialLink socialLink = socialLinkRepository.findById(id)
                .orElseThrow(() -> new SocialLinkNotFoundException("Social Link not found with id: " + id));

        SocialLinkMapper.updateEntityFromDTO(request, socialLink);
        return SocialLinkMapper.toResponse(socialLinkRepository.save(socialLink));
    }

    @Transactional
    public void deleteSocialLink(Long id) {
        if (!socialLinkRepository.existsById(id)) {
            throw new SocialLinkNotFoundException("Social Link not found with id: " + id);
        }
        socialLinkRepository.deleteById(id);
    }

}
