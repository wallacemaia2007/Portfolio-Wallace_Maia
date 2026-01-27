package br.com.wallace.portfolio.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.wallace.portfolio.dtos.FAQResponseDTO;
import br.com.wallace.portfolio.services.FAQService;
import lombok.RequiredArgsConstructor;

@RequestMapping("/api/faqs")
@RestController
@RequiredArgsConstructor
public class FAQController {

    private final FAQService faqService;

    @GetMapping("/faqs")
    public ResponseEntity<List<FAQResponseDTO>> getAllFaqs() {
        return ResponseEntity.ok().body(faqService.getAllFaqs());
    }
}
