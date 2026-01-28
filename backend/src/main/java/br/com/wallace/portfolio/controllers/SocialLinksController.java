package br.com.wallace.portfolio.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.wallace.portfolio.dtos.SocialLinkResponseDTO;
import br.com.wallace.portfolio.dtos.requests.SocialLinkRequestDTO;
import br.com.wallace.portfolio.services.SocialLinksService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/socialLinks")
@RequiredArgsConstructor
public class SocialLinksController {

    private final SocialLinksService socialLinksService;
    

    @GetMapping
    public ResponseEntity<List<SocialLinkResponseDTO>> getSocialLinks() {
        return ResponseEntity.ok(
                socialLinksService.getAllSocialLinks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SocialLinkResponseDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(socialLinksService.getSocialLinkById(id));
    }

    @PostMapping
    public ResponseEntity<SocialLinkResponseDTO> create(
            @Valid @RequestBody SocialLinkRequestDTO dto) {
        SocialLinkResponseDTO created = socialLinksService.createSocialLink(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<SocialLinkResponseDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody SocialLinkRequestDTO dto) {
        return ResponseEntity.ok(socialLinksService.updateSocialLink(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        socialLinksService.deleteSocialLink(id);
        return ResponseEntity.noContent().build();
    }
}
