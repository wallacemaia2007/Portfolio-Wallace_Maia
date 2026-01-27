package br.com.wallace.portfolio.model.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "statistics")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Statistics {
    
    @Id
    private Long id = 1L;

    private Integer totalProjects;
    private Integer completedProjects;
    private Integer happyClients;
    private Integer yearsExperience;
    private Integer technologies;
    private Integer coffeesCups;
}
