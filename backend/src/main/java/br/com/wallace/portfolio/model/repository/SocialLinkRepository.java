package br.com.wallace.portfolio.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.wallace.portfolio.model.entities.SocialLink;

public interface SocialLinkRepository extends JpaRepository<SocialLink, Long> {
    
}
