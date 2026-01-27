package br.com.wallace.portfolio.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.wallace.portfolio.dtos.EducationResponseDTO;
import br.com.wallace.portfolio.dtos.requests.EducationRequestDTO;
import br.com.wallace.portfolio.services.EducationService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/education")
@RequiredArgsConstructor
public class EducationController {

    private final EducationService educationService;

    @GetMapping
    public ResponseEntity<List<EducationResponseDTO>> getAllEducation() {
        return ResponseEntity.ok().body(educationService.getAllEducation());
    }

    @PostMapping
    public ResponseEntity<EducationResponseDTO> createEducation(@RequestBody EducationRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(educationService.createEducation(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EducationResponseDTO> updateEducation(@PathVariable Long id,
            @RequestBody EducationRequestDTO request) {
        return ResponseEntity.ok().body(educationService.updateEducation(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEducation(@PathVariable Long id) {
        educationService.deleteEducation(id);
        return ResponseEntity.noContent().build();
    }

}
