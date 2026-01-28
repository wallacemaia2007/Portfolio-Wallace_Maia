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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.wallace.portfolio.dtos.FAQResponseDTO;
import br.com.wallace.portfolio.dtos.requests.FAQRequestDTO;
import br.com.wallace.portfolio.services.FAQService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequestMapping("/api/faqs")
@RestController
@RequiredArgsConstructor
public class FAQController {

    private final FAQService faqService;

    @GetMapping
    public ResponseEntity<List<FAQResponseDTO>> getFAQs() {
        return ResponseEntity.ok(
                faqService.findAllFAQs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FAQResponseDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(faqService.getFAQById(id));
    }

    @PostMapping
    public ResponseEntity<FAQResponseDTO> create(
            @Valid @RequestBody FAQRequestDTO dto) {
        FAQResponseDTO created = faqService.createFAQ(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<FAQResponseDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody FAQRequestDTO dto) {
        return ResponseEntity.ok(faqService.updateFAQ(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        faqService.deleteFAQ(id);
        return ResponseEntity.noContent().build();
    }
}
