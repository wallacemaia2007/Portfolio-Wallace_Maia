package br.com.wallace.portfolio.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.wallace.portfolio.dtos.ProjectResponseDTO;
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

    public ProjectResponseDTO getProjectById(String id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ProjectsNotFoundException("Project Not Found"));
        return ProjectMapper.toResponse(project);
    }

}
