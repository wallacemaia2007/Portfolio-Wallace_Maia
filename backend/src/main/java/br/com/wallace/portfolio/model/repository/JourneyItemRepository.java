package br.com.wallace.portfolio.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.wallace.portfolio.model.entities.JourneyItem;

public interface JourneyItemRepository extends JpaRepository<JourneyItem, Long> {
    
}
