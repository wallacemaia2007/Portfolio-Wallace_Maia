package br.com.wallace.portfolio.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.wallace.portfolio.model.entities.Education;

public interface EducationRepository extends JpaRepository<Education, Long> {
    
}
