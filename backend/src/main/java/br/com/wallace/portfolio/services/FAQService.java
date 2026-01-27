package br.com.wallace.portfolio.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.wallace.portfolio.dtos.FAQResponseDTO;
import br.com.wallace.portfolio.mappers.FAQMapper;
import br.com.wallace.portfolio.model.repository.FAQRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FAQService {

    private final FAQRepository faqRepository;

    public List<FAQResponseDTO> getAllFaqs() {
        return faqRepository.findAll().stream()
                .map(FAQMapper::toResponse)
                .toList();
    }

}
