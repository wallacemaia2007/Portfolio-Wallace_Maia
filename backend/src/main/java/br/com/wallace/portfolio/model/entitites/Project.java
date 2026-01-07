package br.com.wallace.portfolio.model.entitites;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String slug;
    private String description;
    private String shortDescription;
    private String thumbnail;

    @ElementCollection
    private List<String> images;

    @ElementCollection
    private List<String> technologies;

    private String category;
    private boolean featured;
    private String githubUrl;
    private String liveUrl;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;

    @ElementCollection
    private List<String> tags;

    @ElementCollection
    private List<String> challenges;

    @ElementCollection
    private List<String> learnings;

    private String clientType;

    @ManyToOne
    @JoinColumn(name = "profile_id")
    private Profile profile;

}