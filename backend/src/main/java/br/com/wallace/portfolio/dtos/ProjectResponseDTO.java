package br.com.wallace.portfolio.dtos;

import java.time.LocalDate;
import java.util.List;

public record ProjectResponseDTO(Long id, String title, String slug, String description, String shortDescription,
        String thumbnail, List<String> images, List<String> technologies, String category, boolean featured,
        String githubUrl, String liveUrl,
        LocalDate startDate, LocalDate endDate, String status, List<String> tags, List<String> challenges,
        List<String> learnings, String clientType) {

}
