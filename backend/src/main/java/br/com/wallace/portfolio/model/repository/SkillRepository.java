package br.com.wallace.portfolio.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.wallace.portfolio.model.entities.Skill;


public interface SkillRepository extends JpaRepository<Skill, Long> {
    
}

