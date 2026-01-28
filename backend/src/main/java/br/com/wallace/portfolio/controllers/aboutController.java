package br.com.wallace.portfolio.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.wallace.portfolio.dtos.AboutResponseDTO;
import br.com.wallace.portfolio.dtos.requests.AboutRequestDTO;
import br.com.wallace.portfolio.services.AboutService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/about")
public class AboutController {

    private final AboutService aboutService;

    @GetMapping
    public ResponseEntity<AboutResponseDTO> getAbout() {
        return ResponseEntity.ok(aboutService.getAbout());
    }

    @PatchMapping
    public ResponseEntity<AboutResponseDTO> updateAbout(
            @RequestBody AboutRequestDTO request) {
        return ResponseEntity.ok(aboutService.updateAbout(request));
    }

    @PostMapping
    public ResponseEntity<AboutResponseDTO> create(
            @Valid @RequestBody AboutRequestDTO dto) {
        AboutResponseDTO created = aboutService.createAbout(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @DeleteMapping
    public ResponseEntity<Void> delete() {
        aboutService.deleteAbout();
        return ResponseEntity.noContent().build();
    }
}
