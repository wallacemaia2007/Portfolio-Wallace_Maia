package br.com.wallace.portfolio.model.entities;

import jakarta.persistence.*;
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
    private String id;

    @Column(nullable = false)
    private String author;

    private String role;
    private String company;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String text;

    private String avatar;
    private Integer rating;
}
