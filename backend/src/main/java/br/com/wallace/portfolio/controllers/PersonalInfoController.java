package br.com.wallace.portfolio.controllers;

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

import br.com.wallace.portfolio.dtos.PersonalInfoResponseDTO;
import br.com.wallace.portfolio.dtos.requests.PersonalInfoRequestDTO;
import br.com.wallace.portfolio.services.PersonalInfoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/personalInfo")
@RequiredArgsConstructor
public class PersonalInfoController {

    private final PersonalInfoService personalInfoService;

    @GetMapping
    public ResponseEntity<PersonalInfoResponseDTO> getPersonalInfo() {
        return ResponseEntity.ok(personalInfoService.getPersonalInfo());
    }

    @PatchMapping
    public ResponseEntity<PersonalInfoResponseDTO> updatePersonalInfo(
            @RequestBody PersonalInfoRequestDTO request) {
        return ResponseEntity.ok(personalInfoService.updatePersonalInfo(request));
    }

    @PostMapping
    public ResponseEntity<PersonalInfoResponseDTO> create(
            @Valid @RequestBody PersonalInfoRequestDTO dto) {
        PersonalInfoResponseDTO created = personalInfoService.createPersonalInfo(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @DeleteMapping
    public ResponseEntity<Void> delete() {
        personalInfoService.deletePersonalInfo();
        return ResponseEntity.noContent().build();
    }
}
