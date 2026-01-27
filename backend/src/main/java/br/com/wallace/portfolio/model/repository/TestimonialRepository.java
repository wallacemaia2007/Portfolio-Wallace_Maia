package br.com.wallace.portfolio.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.wallace.portfolio.model.entities.Testimonial;

public interface TestimonialRepository extends JpaRepository<Testimonial, String> {
    
}
