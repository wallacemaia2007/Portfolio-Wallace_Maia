package br.com.wallace.portfolio.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.wallace.portfolio.dtos.StatisticResponseDTO;
import br.com.wallace.portfolio.dtos.requests.StatisticRequestDTO;
import br.com.wallace.portfolio.services.StatisticService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/statistics")
@RequiredArgsConstructor
public class StatisticController {

    private final StatisticService statisticService;

    @GetMapping
    public ResponseEntity<StatisticResponseDTO> getStatistic() {
        return ResponseEntity.ok().body(statisticService.getStatistic());
    }

    @PostMapping
    public ResponseEntity<StatisticResponseDTO> createStatistic(@RequestBody StatisticRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(statisticService.createStatistic(request));
    }

    @PatchMapping
    public ResponseEntity<StatisticResponseDTO> updateStatistic(@RequestBody StatisticRequestDTO request) {
        return ResponseEntity.ok().body(statisticService.updateStatistic(request));
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteStatistic() {
        statisticService.deleteStatistic();
        return ResponseEntity.noContent().build();
    }

}
