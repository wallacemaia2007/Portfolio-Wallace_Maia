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

import br.com.wallace.portfolio.dtos.JourneyItemResponseDTO;
import br.com.wallace.portfolio.dtos.requests.JourneyItemRequestDTO;
import br.com.wallace.portfolio.services.JourneyItemService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/journey")
@RequiredArgsConstructor
public class JourneyItemController {

    private final JourneyItemService journeyItemService;

    @GetMapping
    public ResponseEntity<List<JourneyItemResponseDTO>> getAllJourneyItems() {
        return ResponseEntity.ok().body(journeyItemService.getAllJourneyItems());
    }

    @PostMapping
    public ResponseEntity<JourneyItemResponseDTO> createJourneyItem(@RequestBody JourneyItemRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(journeyItemService.createJourneyItem(request));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<JourneyItemResponseDTO> updateJourneyItem(@PathVariable Long id,
            @RequestBody JourneyItemRequestDTO request) {
        return ResponseEntity.ok().body(journeyItemService.updateJourneyItem(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJourneyItem(@PathVariable Long id) {
        journeyItemService.deleteJourneyItem(id);
        return ResponseEntity.noContent().build();
    }

}
