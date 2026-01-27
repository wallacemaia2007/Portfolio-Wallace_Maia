package br.com.wallace.portfolio.model.entities;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "education")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Education {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String institution;

    @Column(nullable = false)
    private String course;

    private LocalDate startDate;
    private LocalDate endDate;
    private boolean current;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String location;
    private String certificateUrl;
}
