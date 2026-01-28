package br.com.wallace.portfolio.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.wallace.portfolio.dtos.TestimonialResponseDTO;
import br.com.wallace.portfolio.dtos.requests.TestimonialRequestDTO;
import br.com.wallace.portfolio.exceptions.TestimonialNotFoundException;
import br.com.wallace.portfolio.mappers.TestimonialMapper;
import br.com.wallace.portfolio.model.entities.Testimonial;
import br.com.wallace.portfolio.model.repository.TestimonialRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TestimonialsService {

    private final TestimonialRepository testimonialRepository;

    @Transactional
    public List<TestimonialResponseDTO> findTestimonials(Integer rating) {
        List<Testimonial> testimonials;
        if (rating != null) {
            testimonials = testimonialRepository.findByRating(rating);
        } else {
            testimonials = testimonialRepository.findAll();
        }
        return testimonials.stream()
                .map(TestimonialMapper::toResponse)
                .toList();
    }

    @Transactional
    public TestimonialResponseDTO getTestimonialById(Long id) {
        Testimonial testimonial = testimonialRepository.findById(id)
                .orElseThrow(() -> new TestimonialNotFoundException("Testimonial not found with id: " + id));

        return TestimonialMapper.toResponse(testimonial);
    }

    @Transactional
    public TestimonialResponseDTO createTestimonial(TestimonialRequestDTO request) {
        Testimonial testimonial = TestimonialMapper.toEntity(request);
        return TestimonialMapper.toResponse(testimonialRepository.save(testimonial));
    }

    @Transactional
    public TestimonialResponseDTO updateTestimonial(Long id, TestimonialRequestDTO request) {
        Testimonial testimonial = testimonialRepository.findById(id)
                .orElseThrow(() -> new TestimonialNotFoundException("Testimonial not found with id: " + id));

        TestimonialMapper.updateEntityFromDTO(request, testimonial);
        return TestimonialMapper.toResponse(testimonialRepository.save(testimonial));
    }

    @Transactional
    public void deleteTestimonial(Long id) {
        if (!testimonialRepository.existsById(id)) {
            throw new TestimonialNotFoundException("Testimonial not found with id: " + id);
        }
        testimonialRepository.deleteById(id);
    }
}
