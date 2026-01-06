package br.com.wallace.portfolio.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.wallace.portfolio.model.entitites.Statistic;

public interface StatisticRepository extends JpaRepository<Statistic, Long> {
    
}
