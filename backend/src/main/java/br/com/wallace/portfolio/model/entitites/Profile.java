package br.com.wallace.portfolio.model.entitites;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String acronym;
    private String role;
    private String email;
    private String phone;
    private String location;
    private String bio;
    private String avatar;
    private String cvUrl;
    private String githubUrl;
    private String linkedinUrl;
    private String websiteUrl;

    @OneToMany
    private List<Project> projects;
    @OneToMany
    private List<Experience> experiences;
    @OneToMany
    private List<Skill> skills;
    @OneToMany
    private List<SocialLink> socialLinks;
    @OneToOne
    private Statistic statistic;

}
