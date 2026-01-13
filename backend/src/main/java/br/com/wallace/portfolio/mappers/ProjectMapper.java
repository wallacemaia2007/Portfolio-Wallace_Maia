package br.com.wallace.portfolio.mappers;

import br.com.wallace.portfolio.dtos.ProjectResponseDTO;
import br.com.wallace.portfolio.exceptions.ProjectsNotFoundException;
import br.com.wallace.portfolio.model.entitites.Project;

public class ProjectMapper {

    public static ProjectResponseDTO toResponse(Project project) {
        if (project == null) {
            throw new ProjectsNotFoundException("Project Not Found");
        }

        return new ProjectResponseDTO(
                project.getId(),
                project.getTitle(),
                project.getSlug(),
                project.getDescription(),
                project.getShortDescription(),
                project.getThumbnail(),
                project.getImages(),
                project.getTechnologies(),
                project.getCategory(),
                project.isFeatured(),
                project.getGithubUrl(),
                project.getLiveUrl(),
                project.getStartDate(),
                project.getEndDate(),
                project.getStatus(),
                project.getTags(),
                project.getChallenges(),
                project.getLearnings(),
                project.getClientType()
        );
    }
}
