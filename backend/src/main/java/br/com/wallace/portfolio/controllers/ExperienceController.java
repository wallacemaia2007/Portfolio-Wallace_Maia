package br.com.wallace.portfolio.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.wallace.portfolio.dtos.ExperienceResponseDTO;
import br.com.wallace.portfolio.services.ExperienceService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/experiences")
public class ExperienceController {

    private final ExperienceService experienceService;

    @GetMapping()
    public ResponseEntity<List<ExperienceResponseDTO>> getAllExperiences() {
        return ResponseEntity.ok().body(experienceService.getAllExperiences());
    }

}
