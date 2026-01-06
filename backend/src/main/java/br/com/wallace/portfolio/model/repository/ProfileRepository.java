package br.com.wallace.portfolio.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.wallace.portfolio.model.entitites.Profile;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    
}
