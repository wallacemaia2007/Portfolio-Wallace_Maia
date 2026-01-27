package br.com.wallace.portfolio.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.wallace.portfolio.model.entities.About;

public interface AboutRepository extends JpaRepository<About, Long> {
    
}
