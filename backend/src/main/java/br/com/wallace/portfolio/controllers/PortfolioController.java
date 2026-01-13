package br.com.wallace.portfolio.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.wallace.portfolio.dtos.ProfileResponseDTO;
import br.com.wallace.portfolio.dtos.ProjectResponseDTO;
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

}
