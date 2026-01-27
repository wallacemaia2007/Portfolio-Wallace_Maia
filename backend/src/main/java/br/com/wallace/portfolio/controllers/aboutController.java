package br.com.wallace.portfolio.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.wallace.portfolio.dtos.AboutResponseDTO;
import br.com.wallace.portfolio.services.aboutService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/about")
public class aboutController {

    private final aboutService aboutService;

    @GetMapping("/about")
    public ResponseEntity<AboutResponseDTO> getAbout() {
        return ResponseEntity.ok().body(aboutService.getAbout());
    }
}
