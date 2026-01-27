package br.com.wallace.portfolio.mappers;

import java.util.List;

import br.com.wallace.portfolio.dtos.ProjectResponseDTO;
import br.com.wallace.portfolio.dtos.requests.ProjectRequestDTO;
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
                project.getClientType());
    }

    public static void updateEntityFromDTO(ProjectRequestDTO dto, Project entity) {
        if (dto == null || entity == null) {
            return;
        }

        if (dto.title() != null)
            entity.setTitle(dto.title());
        if (dto.slug() != null)
            entity.setSlug(dto.slug());
        if (dto.description() != null)
            entity.setDescription(dto.description());
        if (dto.shortDescription() != null)
            entity.setShortDescription(dto.shortDescription());
        if (dto.thumbnail() != null)
            entity.setThumbnail(dto.thumbnail());
        if (dto.images() != null)
            entity.setImages(dto.images());
        if (dto.technologies() != null)
            entity.setTechnologies(dto.technologies());
        if (dto.category() != null)
            entity.setCategory(dto.category());
        if (dto.featured() != null)
            entity.setFeatured(Boolean.TRUE.equals(dto.featured()));
        if (dto.githubUrl() != null)
            entity.setGithubUrl(dto.githubUrl());
        if (dto.liveUrl() != null)
            entity.setLiveUrl(dto.liveUrl());
        if (dto.startDate() != null)
            entity.setStartDate(dto.startDate());
        if (dto.endDate() != null)
            entity.setEndDate(dto.endDate());
        if (dto.status() != null)
            entity.setStatus(dto.status());
        if (dto.tags() != null)
            entity.setTags(dto.tags());
        if (dto.challenges() != null)
            entity.setChallenges(dto.challenges());
        if (dto.learnings() != null)
            entity.setLearnings(dto.learnings());
        if (dto.clientType() != null)
            entity.setClientType(dto.clientType());
    }

    public static Project toEntity(ProjectRequestDTO dto) {
        if (dto == null) {
            throw new ProjectsNotFoundException("Project Not Found");
        }

        Project project = new Project();
        project.setTitle(dto.title());
        project.setSlug(dto.slug());
        project.setDescription(dto.description());
        project.setShortDescription(dto.shortDescription());
        project.setThumbnail(dto.thumbnail());
        project.setImages(dto.images());
        project.setTechnologies(dto.technologies());
        project.setCategory(dto.category());
        project.setFeatured(Boolean.TRUE.equals(dto.featured()));
        project.setGithubUrl(dto.githubUrl());
        project.setLiveUrl(dto.liveUrl());
        project.setStartDate(dto.startDate());
        project.setEndDate(dto.endDate());
        project.setStatus(dto.status());
        project.setTags(dto.tags());
        project.setChallenges(dto.challenges());
        project.setLearnings(dto.learnings());
        project.setClientType(dto.clientType());

        return project;
    }
}
