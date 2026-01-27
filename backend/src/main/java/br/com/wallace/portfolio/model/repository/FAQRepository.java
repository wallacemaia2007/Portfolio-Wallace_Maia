package br.com.wallace.portfolio.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.wallace.portfolio.model.entities.FAQ;

public interface FAQRepository extends JpaRepository<FAQ, Long> {
    
}
