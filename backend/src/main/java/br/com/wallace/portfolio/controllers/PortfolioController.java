package br.com.wallace.portfolio.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.wallace.portfolio.dtos.AboutResponseDTO;
import br.com.wallace.portfolio.dtos.EducationResponseDTO;
import br.com.wallace.portfolio.dtos.ExperienceResponseDTO;
import br.com.wallace.portfolio.dtos.FAQResponseDTO;
import br.com.wallace.portfolio.dtos.HobbyResponseDTO;
import br.com.wallace.portfolio.dtos.JourneyItemResponseDTO;
import br.com.wallace.portfolio.dtos.ProfileResponseDTO;
import br.com.wallace.portfolio.dtos.ProjectResponseDTO;
import br.com.wallace.portfolio.dtos.SkillResponseDTO;
import br.com.wallace.portfolio.dtos.SocialLinkResponseDTO;
import br.com.wallace.portfolio.dtos.StatisticResponseDTO;
import br.com.wallace.portfolio.dtos.TestimonialResponseDTO;
import br.com.wallace.portfolio.dtos.ValueResponseDTO;
import br.com.wallace.portfolio.services.PortfolioService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PortfolioController {

    private final PortfolioService portfolioService;

    @GetMapping("/profile")
    public ResponseEntity<ProfileResponseDTO> getProfile() {
        return ResponseEntity.ok().body(portfolioService.getProfile());
    }

    @GetMapping("/projects")
    public ResponseEntity<List<ProjectResponseDTO>> getAllProjects() {
        return ResponseEntity.ok().body(portfolioService.getAllProjects());
    }

    @GetMapping("/projects/{id}")
    public ResponseEntity<ProjectResponseDTO> getProjectById(@PathVariable String id) {
        return ResponseEntity.ok().body(portfolioService.getProjectById(id));
    }

    @GetMapping("/skills")
    public ResponseEntity<List<SkillResponseDTO>> getAllSkills() {
        return ResponseEntity.ok().body(portfolioService.getAllSkills());
    }

    @GetMapping("/experiences")
    public ResponseEntity<List<ExperienceResponseDTO>> getAllExperiences() {
        return ResponseEntity.ok().body(portfolioService.getAllExperiences());
    }

    @GetMapping("/statistics")
    public ResponseEntity<List<StatisticResponseDTO>> getAllStatistics() {
        return ResponseEntity.ok().body(portfolioService.getAllStatistics());
    }

    @GetMapping("/socialLinks")
    public ResponseEntity<List<SocialLinkResponseDTO>> getAllSocialLinks() {
        return ResponseEntity.ok().body(portfolioService.getAllSocialLinks());
    }

    @GetMapping("/about")
    public ResponseEntity<AboutResponseDTO> getAbout() {
        return ResponseEntity.ok().body(portfolioService.getAbout());
    }

    @GetMapping("/education")
    public ResponseEntity<List<EducationResponseDTO>> getAllEducation() {
        return ResponseEntity.ok().body(portfolioService.getAllEducation());
    }

    @GetMapping("/faqs")
    public ResponseEntity<List<FAQResponseDTO>> getAllFaqs() {
        return ResponseEntity.ok().body(portfolioService.getAllFaqs());
    }

    @GetMapping("/hobbies")
    public ResponseEntity<List<HobbyResponseDTO>> getAllHobbies() {
        return ResponseEntity.ok().body(portfolioService.getAllHobbies());
    }

    @GetMapping("/journey")
    public ResponseEntity<List<JourneyItemResponseDTO>> getAllJourneyItems() {
        return ResponseEntity.ok().body(portfolioService.getAllJourneyItems());
    }

    @GetMapping("/testimonials")
    public ResponseEntity<List<TestimonialResponseDTO>> getAllTestimonials() {
        return ResponseEntity.ok().body(portfolioService.getAllTestimonials());
    }

    @GetMapping("/values")
    public ResponseEntity<List<ValueResponseDTO>> getAllValues() {
        return ResponseEntity.ok().body(portfolioService.getAllValues());
    }

}
