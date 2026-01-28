package br.com.wallace.portfolio.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.wallace.portfolio.dtos.TestimonialResponseDTO;
import br.com.wallace.portfolio.dtos.requests.TestimonialRequestDTO;
import br.com.wallace.portfolio.services.TestimonialsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/testimonials")
@RequiredArgsConstructor
public class TestimonialsController {

    private final TestimonialsService testimonialsService;

    @GetMapping
    public ResponseEntity<List<TestimonialResponseDTO>> getTestimonials(
            @RequestParam(required = false) Integer rating) {
        return ResponseEntity.ok(
                testimonialsService.findTestimonials(rating));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TestimonialResponseDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(testimonialsService.getTestimonialById(id));
    }

    @PostMapping
    public ResponseEntity<TestimonialResponseDTO> create(
            @Valid @RequestBody TestimonialRequestDTO dto) {
        TestimonialResponseDTO created = testimonialsService.createTestimonial(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<TestimonialResponseDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody TestimonialRequestDTO dto) {
        return ResponseEntity.ok(testimonialsService.updateTestimonial(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        testimonialsService.deleteTestimonial(id);
        return ResponseEntity.noContent().build();
    }
}
