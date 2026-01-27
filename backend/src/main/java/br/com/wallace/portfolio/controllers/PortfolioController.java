package br.com.wallace.portfolio.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.wallace.portfolio.dtos.EducationResponseDTO;
import br.com.wallace.portfolio.dtos.HobbyResponseDTO;
import br.com.wallace.portfolio.dtos.JourneyItemResponseDTO;
import br.com.wallace.portfolio.dtos.ValueResponseDTO;
import br.com.wallace.portfolio.services.PortfolioService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PortfolioController {

    private final PortfolioService portfolioService;

    @GetMapping("/education")
    public ResponseEntity<List<EducationResponseDTO>> getAllEducation() {
        return ResponseEntity.ok().body(portfolioService.getAllEducation());
    }

    @GetMapping("/hobbies")
    public ResponseEntity<List<HobbyResponseDTO>> getAllHobbies() {
        return ResponseEntity.ok().body(portfolioService.getAllHobbies());
    }

    @GetMapping("/journey")
    public ResponseEntity<List<JourneyItemResponseDTO>> getAllJourneyItems() {
        return ResponseEntity.ok().body(portfolioService.getAllJourneyItems());
    }

    @GetMapping("/values")
    public ResponseEntity<List<ValueResponseDTO>> getAllValues() {
        return ResponseEntity.ok().body(portfolioService.getAllValues());
    }

}
