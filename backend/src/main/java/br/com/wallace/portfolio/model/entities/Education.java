package br.com.wallace.portfolio.model.entities;

import jakarta.persistence.*;
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
    private String id;

    @Column(nullable = false)
    private String institution;

    @Column(nullable = false)
    private String course;

    private String startDate;
    private String endDate;
    private boolean current;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String location;
    private String certificateUrl;
}
