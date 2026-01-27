package br.com.wallace.portfolio.model.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "personal_info")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonalInfo {

    @Id
    private Long id = 1L;

    @Column(nullable = false)
    private String fullName;

    private String acronym;

    @Column(nullable = false)
    private String role;

    @Column(nullable = false, unique = true)
    private String email;

    private String phone;
    private String location;

    @Column(columnDefinition = "TEXT")
    private String bio;

    private String avatar;
    private String cvUrl;
    private String github;
    private String linkedin;
    private String website;
}
