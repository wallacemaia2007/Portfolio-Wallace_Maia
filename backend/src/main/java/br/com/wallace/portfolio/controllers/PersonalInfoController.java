package br.com.wallace.portfolio.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.wallace.portfolio.dtos.PersonalInfoResponseDTO;
import br.com.wallace.portfolio.dtos.requests.PersonalInfoRequestDTO;
import br.com.wallace.portfolio.services.PersonalInfoService;
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
}
