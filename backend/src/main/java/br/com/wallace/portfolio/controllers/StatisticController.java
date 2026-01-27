package br.com.wallace.portfolio.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.wallace.portfolio.dtos.StatisticResponseDTO;
import br.com.wallace.portfolio.services.StatisticService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/statistics")
@RequiredArgsConstructor
public class StatisticController {

    private final StatisticService statisticService;

    @GetMapping()
    public ResponseEntity<List<StatisticResponseDTO>> getAllStatistics() {
        return ResponseEntity.ok().body(statisticService.getAllStatistics());
    }

}
