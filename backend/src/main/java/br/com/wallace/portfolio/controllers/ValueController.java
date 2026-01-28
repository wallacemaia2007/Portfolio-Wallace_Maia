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

import br.com.wallace.portfolio.dtos.ValueResponseDTO;
import br.com.wallace.portfolio.dtos.requests.ValueRequestDTO;
import br.com.wallace.portfolio.services.ValueService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/values")
@RequiredArgsConstructor
public class ValueController {

    private final ValueService valueService;

    @GetMapping
    public ResponseEntity<List<ValueResponseDTO>> getAllValues() {
        return ResponseEntity.ok().body(valueService.getAllValues());
    }

    @PostMapping
    public ResponseEntity<ValueResponseDTO> createValue(@RequestBody ValueRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(valueService.createValue(request));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ValueResponseDTO> updateValue(@PathVariable Long id,
            @RequestBody ValueRequestDTO request) {
        return ResponseEntity.ok().body(valueService.updateValue(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteValue(@PathVariable Long id) {
        valueService.deleteValue(id);
        return ResponseEntity.noContent().build();
    }

}
