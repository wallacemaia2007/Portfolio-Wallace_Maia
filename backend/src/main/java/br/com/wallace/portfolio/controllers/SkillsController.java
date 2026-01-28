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

import br.com.wallace.portfolio.dtos.SkillResponseDTO;
import br.com.wallace.portfolio.dtos.requests.SkillRequestDTO;
import br.com.wallace.portfolio.services.SkillsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/skills")
@RequiredArgsConstructor
public class SkillsController {

    private final SkillsService skillsService;

    @GetMapping
    public ResponseEntity<List<SkillResponseDTO>> getSkills(
            @RequestParam(required = false) String category) {
        return ResponseEntity.ok(
                skillsService.getAllSkills(category));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SkillResponseDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(skillsService.getSkillById(id));
    }

    @PostMapping
    public ResponseEntity<SkillResponseDTO> create(
            @Valid @RequestBody SkillRequestDTO dto) {
        SkillResponseDTO created = skillsService.createSkill(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<SkillResponseDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody SkillRequestDTO dto) {
        return ResponseEntity.ok(skillsService.updateSkill(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        skillsService.deleteSkill(id);
        return ResponseEntity.noContent().build();
    }
}
