package br.com.wallace.portfolio.dtos;

import java.util.List;

public record ProjectResponseDTO(
        String id,
        String title,
        String slug,
        String description,
        String shortDescription,
        String thumbnail,
        List<String> images,
        List<String> technologies,
        String category,
        boolean featured,
        String githubUrl,
        String liveUrl,
        String startDate,
        String endDate,
        String status,
        List<String> tags,
        List<String> challenges,
        List<String> learnings,
        String clientType) {
}
