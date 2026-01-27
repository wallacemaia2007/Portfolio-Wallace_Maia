package br.com.wallace.portfolio.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.wallace.portfolio.dtos.ProjectResponseDTO;
import br.com.wallace.portfolio.dtos.requests.ProjectRequestDTO;
import br.com.wallace.portfolio.exceptions.ProjectsNotFoundException;
import br.com.wallace.portfolio.mappers.ProjectMapper;
import br.com.wallace.portfolio.model.entities.Project;
import br.com.wallace.portfolio.model.repository.ProjectRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

    public List<ProjectResponseDTO> findProjects(
            String title,
            String category,
            Boolean featured) {

        List<Project> projects;

        if (title != null && !title.isBlank()) {
            projects = projectRepository.findByTitleContainingIgnoreCase(title);

        } else if (category != null && featured != null) {
            projects = projectRepository
                    .findByCategoryIgnoreCaseAndFeatured(category, featured);

        } else if (category != null) {
            projects = projectRepository.findByCategoryIgnoreCase(category);

        } else if (Boolean.TRUE.equals(featured)) {
            projects = projectRepository.findByFeaturedTrue();

        } else {
            projects = projectRepository.findAll();
        }

        return projects.stream()
                .map(ProjectMapper::toResponse)
                .toList();
    }

    public ProjectResponseDTO getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ProjectsNotFoundException("Project not found with id: " + id));

        return ProjectMapper.toResponse(project);
    }

    @Transactional
    public ProjectResponseDTO createProject(ProjectRequestDTO request) {
        Project project = ProjectMapper.toEntity(request);
        return ProjectMapper.toResponse(projectRepository.save(project));
    }

    @Transactional
    public ProjectResponseDTO updateProject(Long id, ProjectRequestDTO request) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ProjectsNotFoundException("Project not found with id: " + id));

        ProjectMapper.updateEntityFromDTO(request, project);
        return ProjectMapper.toResponse(projectRepository.save(project));
    }

    @Transactional
    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new ProjectsNotFoundException("Project not found with id: " + id);
        }
        projectRepository.deleteById(id);
    }
}
