package br.com.wallace.portfolio.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.wallace.portfolio.dtos.SocialLinkResponseDTO;
import br.com.wallace.portfolio.services.SocialLinksService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/socialLinks")
@RequiredArgsConstructor
public class SocialLinksController {

    private final SocialLinksService socialLinksService;
    
    
    @GetMapping()
    public ResponseEntity<List<SocialLinkResponseDTO>> getAllSocialLinks() {
        return ResponseEntity.ok().body(socialLinksService.getAllSocialLinks());
    }
}
