package br.com.wallace.portfolio.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.wallace.portfolio.model.entities.Statistics;

public interface StatisticRepository extends JpaRepository<Statistics, Long> {
    
}
