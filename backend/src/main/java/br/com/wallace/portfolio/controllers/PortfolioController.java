package br.com.wallace.portfolio.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.wallace.portfolio.dtos.ExperienceResponseDTO;
import br.com.wallace.portfolio.dtos.ProfileResponseDTO;
import br.com.wallace.portfolio.dtos.ProjectResponseDTO;
import br.com.wallace.portfolio.dtos.SkillResponseDTO;
import br.com.wallace.portfolio.dtos.SocialLinkResponseDTO;
import br.com.wallace.portfolio.dtos.StatisticResponseDTO;
import br.com.wallace.portfolio.services.PortfolioService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PortfolioController {

    private final PortfolioService portfolioService;

    @GetMapping("/profile")
    public ResponseEntity<ProfileResponseDTO> getProfile() {
        ProfileResponseDTO profile = portfolioService.getProfile();
        return ResponseEntity.ok().body(profile);
    }

    @GetMapping("/projects")
    public ResponseEntity<List<ProjectResponseDTO>> getAllProjects() {
        List<ProjectResponseDTO> projects = portfolioService.getAllProjects();
        return ResponseEntity.ok().body(projects);
    }

    @GetMapping("/projects/{id}")
    public ResponseEntity<ProjectResponseDTO> getProjectById(@PathVariable Long id) {
        ProjectResponseDTO project = portfolioService.getProjectById(id);
        return ResponseEntity.ok().body(project);
    }

    @GetMapping("/skills")
    public ResponseEntity<List<SkillResponseDTO>> getAllSkills() {
        List<SkillResponseDTO> skills = portfolioService.getAllSkills();
        return ResponseEntity.ok().body(skills);
    }

    @GetMapping("/experiences")
    public ResponseEntity<List<ExperienceResponseDTO>> getAllExperience() {
        List<ExperienceResponseDTO> experiences = portfolioService.getAllExperience();
        return ResponseEntity.ok().body(experiences);
    }

    @GetMapping("/statistics")
    public ResponseEntity<List<StatisticResponseDTO>> getAllStatistics() {
        List<StatisticResponseDTO> statistics = portfolioService.getAllStatistics();
        return ResponseEntity.ok().body(statistics);
    }

    @GetMapping("/socialLinks")
    public ResponseEntity<List<SocialLinkResponseDTO>> getAllSocialLinks() {
        List<SocialLinkResponseDTO> socialLinks = portfolioService.getAllSocialLinks();
        return ResponseEntity.ok().body(socialLinks);
    }

}
