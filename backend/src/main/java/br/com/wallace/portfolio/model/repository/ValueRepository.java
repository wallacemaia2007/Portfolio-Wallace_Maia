package br.com.wallace.portfolio.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.wallace.portfolio.model.entities.Value;

public interface ValueRepository extends JpaRepository<Value, Long> {
    
}
