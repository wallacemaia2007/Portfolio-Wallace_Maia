package br.com.wallace.portfolio.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.wallace.portfolio.model.entitites.Experience;

public interface ExperienceRepository extends JpaRepository<Experience, Long> {
    
}
