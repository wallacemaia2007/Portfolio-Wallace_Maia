package br.com.wallace.portfolio.services;

import org.springframework.stereotype.Service;

import br.com.wallace.portfolio.dtos.AboutResponseDTO;
import br.com.wallace.portfolio.dtos.requests.AboutRequestDTO;
import br.com.wallace.portfolio.exceptions.AboutAlreadyExistsException;
import br.com.wallace.portfolio.exceptions.AboutNotFoundException;
import br.com.wallace.portfolio.mappers.AboutMapper;
import br.com.wallace.portfolio.model.entities.About;
import br.com.wallace.portfolio.model.repository.AboutRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AboutService {
    private static final Long ID = 1L;

    private final AboutRepository aboutRepository;

    private About getAboutEntity() {
        return aboutRepository.findById(ID)
                .orElseThrow(() -> new AboutNotFoundException("About not found"));
    }

    @Transactional
    public AboutResponseDTO getAbout() {
        return AboutMapper.toResponse(getAboutEntity());
    }

    @Transactional
    public AboutResponseDTO updateAbout(AboutRequestDTO request) {
        About existingAbout = getAboutEntity();
        AboutMapper.updateEntityFromRequest(request, existingAbout);
        return AboutMapper.toResponse(aboutRepository.save(existingAbout));
    }

    @Transactional
    public AboutResponseDTO createAbout(AboutRequestDTO request) {
        if (aboutRepository.existsById(ID)) {
            throw new AboutAlreadyExistsException("About already exists. Only one instance is allowed.");
        }

        About about = AboutMapper.toEntity(request);
        return AboutMapper.toResponse(aboutRepository.save(about));
    }

    @Transactional
    public void deleteAbout() {
        if (!aboutRepository.existsById(ID)) {
            throw new AboutNotFoundException("About not found");
        }
        aboutRepository.deleteById(ID);
    }
}
