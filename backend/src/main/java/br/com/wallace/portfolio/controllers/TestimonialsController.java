package br.com.wallace.portfolio.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.wallace.portfolio.dtos.TestimonialResponseDTO;
import br.com.wallace.portfolio.services.TestimonialsService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/testimonials")
@RequiredArgsConstructor
public class TestimonialsController {

    private final TestimonialsService testimonialsService;

    @GetMapping()
    public ResponseEntity<List<TestimonialResponseDTO>> getAllTestimonials() {
        return ResponseEntity.ok().body(testimonialsService.getAllTestimonials());
    }

    @GetMapping("/{rating}")
    public ResponseEntity<List<TestimonialResponseDTO>> filterTestimonialsByRating(@PathVariable int rating) {
        return ResponseEntity.ok().body(testimonialsService.filterTestimonialsByRating(rating));
    }

}
