package br.com.wallace.portfolio.model.entities;

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
@Table(name = "testimonial")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Testimonial {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String author;

    private String role;
    private String company;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String text;

    private String avatar;
    private Integer rating;
}
