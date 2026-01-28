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
                .orElseThrow(() -> new AboutNotFoundException("Personal info not found with id: 1"));
    }

    @Transactional
    public AboutResponseDTO getAbout() {
        About about = getAboutEntity();
        return AboutMapper.toResponse(about);
    }

    @Transactional
    public AboutResponseDTO updateAbout(AboutRequestDTO request) {
        About existingAbout = aboutRepository.findById(ID)
                .orElseThrow(() -> new AboutNotFoundException("About not found"));

        AboutMapper.updateEntityFromRequest(request, existingAbout);

        About saved = aboutRepository.save(existingAbout);
        return AboutMapper.toResponse(saved);
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
