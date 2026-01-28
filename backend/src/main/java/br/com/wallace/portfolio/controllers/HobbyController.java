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

import br.com.wallace.portfolio.dtos.HobbyResponseDTO;
import br.com.wallace.portfolio.dtos.requests.HobbyRequestDTO;
import br.com.wallace.portfolio.services.HobbyService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/hobbies")
@RequiredArgsConstructor
public class HobbyController {

    private final HobbyService hobbyService;

    @GetMapping
    public ResponseEntity<List<HobbyResponseDTO>> getAllHobbies() {
        return ResponseEntity.ok().body(hobbyService.getAllHobbies());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HobbyResponseDTO> getHobbyById(@PathVariable Long id) {
        return ResponseEntity.ok().body(hobbyService.getHobbyById(id));
    }

    @PostMapping
    public ResponseEntity<HobbyResponseDTO> createHobby(@RequestBody HobbyRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(hobbyService.createHobby(request));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<HobbyResponseDTO> updateHobby(@PathVariable Long id,
            @RequestBody HobbyRequestDTO request) {
        return ResponseEntity.ok().body(hobbyService.updateHobby(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHobby(@PathVariable Long id) {
        hobbyService.deleteHobby(id);
        return ResponseEntity.noContent().build();
    }

}
