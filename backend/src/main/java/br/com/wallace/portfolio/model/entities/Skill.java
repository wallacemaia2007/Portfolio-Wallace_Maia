package br.com.wallace.portfolio.model.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "skill")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Skill {
    @Id
    private String id;

    @Column(nullable = false)
    private String name;

    private String category;
    private Integer level;
    private Integer yearsOfExperience;
    private String icon;
    private String color;
}
