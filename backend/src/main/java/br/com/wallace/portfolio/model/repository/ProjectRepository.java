package br.com.wallace.portfolio.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.wallace.portfolio.model.entitites.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    
}

