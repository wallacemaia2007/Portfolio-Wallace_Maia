package br.com.wallace.portfolio.dtos.requests;

import java.util.List;
import java.time.LocalDate;

public record ProjectRequestDTO(
                String title,
                String slug,
                String description,
                String shortDescription,
                String thumbnail,
                List<String> images,
                List<String> technologies,
                String category,
                Boolean featured,
                String githubUrl,
                String liveUrl,
                LocalDate startDate,
                LocalDate endDate,
                String status,
                List<String> tags,
                List<String> challenges,
                List<String> learnings,
                String clientType) {

}
