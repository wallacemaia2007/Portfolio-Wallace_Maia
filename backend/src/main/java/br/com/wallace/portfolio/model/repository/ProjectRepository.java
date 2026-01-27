package br.com.wallace.portfolio.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.wallace.portfolio.model.entities.Project;

public interface ProjectRepository extends JpaRepository<Project, String> {
    
}

