package br.com.wallace.portfolio.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.wallace.portfolio.model.entities.Hobby;

public interface HobbyRepository extends JpaRepository<Hobby, String> {
    
}
