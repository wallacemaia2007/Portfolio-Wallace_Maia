package br.com.wallace.portfolio.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.wallace.portfolio.dtos.ProfileResponseDTO;
import br.com.wallace.portfolio.dtos.ProjectResponseDTO;
import br.com.wallace.portfolio.exceptions.ProfileNotFoundException;
import br.com.wallace.portfolio.exceptions.ProjectsNotFoundException;
import br.com.wallace.portfolio.mappers.ProfileMapper;
import br.com.wallace.portfolio.mappers.ProjectMapper;
import br.com.wallace.portfolio.model.entitites.Profile;
import br.com.wallace.portfolio.model.entitites.Project;
import br.com.wallace.portfolio.model.repository.ProfileRepository;
import br.com.wallace.portfolio.model.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PortfolioService {

    private final ProfileRepository profileRepository;
    private final ProjectRepository projectRepository;

    public ProfileResponseDTO getProfile() {
        Profile profile = profileRepository.findById(1L).orElseThrow(
                () -> new ProfileNotFoundException("Profile not found"));
        return ProfileMapper.toResponse(profile);
    }

    public List<ProjectResponseDTO> getAllProjects() {
        List<Project> projects = projectRepository.findAll();
        List<ProjectResponseDTO> projectResponseDTOs = projects.stream()
                .map(ProjectMapper::toResponse).toList();
        return projectResponseDTOs;
    }

    public ProjectResponseDTO getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ProjectsNotFoundException("Project Not Found"));
        return ProjectMapper.toResponse(project);
    }

}