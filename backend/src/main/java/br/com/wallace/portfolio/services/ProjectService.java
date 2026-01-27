package br.com.wallace.portfolio.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.wallace.portfolio.dtos.ProjectResponseDTO;
import br.com.wallace.portfolio.dtos.requests.ProjectRequestDTO;
import br.com.wallace.portfolio.exceptions.ProjectsNotFoundException;
import br.com.wallace.portfolio.mappers.ProjectMapper;
import br.com.wallace.portfolio.model.entities.Project;
import br.com.wallace.portfolio.model.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

    public List<ProjectResponseDTO> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(ProjectMapper::toResponse)
                .toList();
    }

    public ProjectResponseDTO getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ProjectsNotFoundException("Project Not Found"));
        return ProjectMapper.toResponse(project);
    }

    public List<ProjectResponseDTO> getFeaturedProjects() {
        List<ProjectResponseDTO> allProjects = getAllProjects();
        List<ProjectResponseDTO> featuredProjects = allProjects.stream()
                .filter(ProjectResponseDTO::featured)
                .toList();
        if (featuredProjects.isEmpty()) {
            throw new ProjectsNotFoundException("No featured projects found");
        }
        return featuredProjects;
    }

    public ProjectResponseDTO updateProject(Long id, ProjectRequestDTO request) {
        Project existingProject = projectRepository.findById(id)
                .orElseThrow(() -> new ProjectsNotFoundException("Project Not Found"));

        ProjectMapper.updateEntityFromDTO(request, existingProject);
        ProjectResponseDTO updatedProject = ProjectMapper.toResponse(projectRepository.save(existingProject));
        return updatedProject;
    }

    public ProjectResponseDTO createProject(ProjectRequestDTO request) {
        Project newProject = ProjectMapper.toEntity(request);
        Project savedProject = projectRepository.save(newProject);
        return ProjectMapper.toResponse(savedProject);
    }

    public List<ProjectResponseDTO> getProjectsByCategory(String category) {
        List<Project> projects = projectRepository.findAll().stream()
                .filter(project -> category.equalsIgnoreCase(project.getCategory()))
                .toList();
        if (projects.isEmpty()) {
            throw new ProjectsNotFoundException("No projects found in the category: " + category);
        }
        return projects.stream()
                .map(ProjectMapper::toResponse)
                .toList();
    }


    public List<ProjectResponseDTO> getProjectsByTitle(String title) {
        List<Project> projects = projectRepository.findAll().stream()
                .filter(project -> project.getTitle().toLowerCase().contains(title.toLowerCase()))
                .toList();
        if (projects.isEmpty()) {
            throw new ProjectsNotFoundException("No projects found with name containing: " + title);
        }
        return projects.stream()
                .map(ProjectMapper::toResponse)
                .toList();
    }

}
