package br.com.wallace.portfolio.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.wallace.portfolio.model.entities.Experience;

public interface ExperienceRepository extends JpaRepository<Experience, String> {
    
}
