package br.com.wallace.portfolio.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.wallace.portfolio.model.entities.PersonalInfo;

public interface PersonalInfoRepository extends JpaRepository<PersonalInfo, Integer> {
    
}
