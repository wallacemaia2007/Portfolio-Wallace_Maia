package br.com.wallace.portfolio.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.wallace.portfolio.dtos.FAQResponseDTO;
import br.com.wallace.portfolio.dtos.requests.FAQRequestDTO;
import br.com.wallace.portfolio.exceptions.FAQNotFoundException;
import br.com.wallace.portfolio.mappers.FAQMapper;
import br.com.wallace.portfolio.model.entities.FAQ;
import br.com.wallace.portfolio.model.repository.FAQRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FAQService {

    private final FAQRepository faqRepository;

    public List<FAQResponseDTO> findAllFAQs() {

        List<FAQ> faqs = faqRepository.findAll();

        return faqs.stream()
                .map(FAQMapper::toResponse)
                .toList();
    }

    public FAQResponseDTO getFAQById(Long id) {
        FAQ faq = faqRepository.findById(id)
                .orElseThrow(() -> new FAQNotFoundException("FAQ not found with id: " + id));

        return FAQMapper.toResponse(faq);
    }

    @Transactional
    public FAQResponseDTO createFAQ(FAQRequestDTO request) {
        FAQ faq = FAQMapper.toEntity(request);
        return FAQMapper.toResponse(faqRepository.save(faq));
    }

    @Transactional
    public FAQResponseDTO updateFAQ(Long id, FAQRequestDTO request) {
        FAQ faq = faqRepository.findById(id)
                .orElseThrow(() -> new FAQNotFoundException("FAQ not found with id: " + id));

        FAQMapper.updateEntityFromDTO(request, faq);
        return FAQMapper.toResponse(faqRepository.save(faq));
    }

    @Transactional
    public void deleteFAQ(Long id) {
        if (!faqRepository.existsById(id)) {
            throw new FAQNotFoundException("FAQ not found with id: " + id);
        }
        faqRepository.deleteById(id);
    }
}
