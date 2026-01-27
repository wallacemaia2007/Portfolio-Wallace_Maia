package br.com.wallace.portfolio.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.wallace.portfolio.dtos.TestimonialResponseDTO;
import br.com.wallace.portfolio.mappers.TestimonialMapper;
import br.com.wallace.portfolio.model.repository.TestimonialRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TestimonialsService {

    private final TestimonialRepository testimonialRepository;

    public List<TestimonialResponseDTO> getAllTestimonials() {
        return testimonialRepository.findAll().stream()
                .map(TestimonialMapper::toResponse)
                .toList();
    }

    public List<TestimonialResponseDTO> filterTestimonialsByRating(int rating) {
        return testimonialRepository.findByRating(rating).stream()
                .map(TestimonialMapper::toResponse)
                .toList();
    }

}
