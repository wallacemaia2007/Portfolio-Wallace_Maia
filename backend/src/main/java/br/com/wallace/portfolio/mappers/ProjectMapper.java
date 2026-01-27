package br.com.wallace.portfolio.mappers;

import java.util.List;

import br.com.wallace.portfolio.dtos.ProjectResponseDTO;
import br.com.wallace.portfolio.exceptions.ProjectsNotFoundException;
import br.com.wallace.portfolio.model.entities.Project;

public class ProjectMapper {

    public static ProjectResponseDTO toResponse(Project project) {
        if (project == null) {
            throw new ProjectsNotFoundException("Project Not Found");
        }

        List<String> images = project.getImages();
        List<String> technologies = project.getTechnologies();
        List<String> tags = project.getTags();
        List<String> challenges = project.getChallenges();
        List<String> learnings = project.getLearnings();

        return new ProjectResponseDTO(
                project.getId(),
                project.getTitle(),
                project.getSlug(),
                project.getDescription(),
                project.getShortDescription(),
                project.getThumbnail(),
                images,
                technologies,
                project.getCategory(),
                project.isFeatured(),
                project.getGithubUrl(),
                project.getLiveUrl(),
                project.getStartDate(),
                project.getEndDate(),
                project.getStatus(),
                tags,
                challenges,
                learnings,
                project.getClientType()
        );
    }
}
