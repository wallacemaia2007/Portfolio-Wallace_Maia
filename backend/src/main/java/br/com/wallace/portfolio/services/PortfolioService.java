package br.com.wallace.portfolio.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.wallace.portfolio.dtos.ExperienceResponseDTO;
import br.com.wallace.portfolio.dtos.ProfileResponseDTO;
import br.com.wallace.portfolio.dtos.ProjectResponseDTO;
import br.com.wallace.portfolio.dtos.SkillResponseDTO;
import br.com.wallace.portfolio.dtos.SocialLinkResponseDTO;
import br.com.wallace.portfolio.dtos.StatisticResponseDTO;
import br.com.wallace.portfolio.exceptions.ProfileNotFoundException;
import br.com.wallace.portfolio.exceptions.ProjectsNotFoundException;
import br.com.wallace.portfolio.mappers.ExperienceMapper;
import br.com.wallace.portfolio.mappers.ProfileMapper;
import br.com.wallace.portfolio.mappers.ProjectMapper;
import br.com.wallace.portfolio.mappers.SkillMapper;
import br.com.wallace.portfolio.mappers.SocialLinkMapper;
import br.com.wallace.portfolio.mappers.StatisticMapper;
import br.com.wallace.portfolio.model.entitites.Experience;
import br.com.wallace.portfolio.model.entitites.Profile;
import br.com.wallace.portfolio.model.entitites.Project;
import br.com.wallace.portfolio.model.entitites.Skill;
import br.com.wallace.portfolio.model.entitites.SocialLink;
import br.com.wallace.portfolio.model.entitites.Statistic;
import br.com.wallace.portfolio.model.repository.ExperienceRepository;
import br.com.wallace.portfolio.model.repository.ProfileRepository;
import br.com.wallace.portfolio.model.repository.ProjectRepository;
import br.com.wallace.portfolio.model.repository.SkillRepository;
import br.com.wallace.portfolio.model.repository.SocialLinkRepository;
import br.com.wallace.portfolio.model.repository.StatisticRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PortfolioService {

    private final ProfileRepository profileRepository;
    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final ExperienceRepository experienceRepository;
    private final SocialLinkRepository socialLinkRepository;
    private final StatisticRepository statisticRepository;

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

    public List<SkillResponseDTO> getAllSkills() {
        List<Skill> list = skillRepository.findAll();
        List<SkillResponseDTO> skillResponseDTOs = list.stream()
                .map(SkillMapper::toResponse).toList();
        return skillResponseDTOs;
    }

    public List<ExperienceResponseDTO> getAllExperience() {
        List<Experience> list = experienceRepository.findAll();
        List<ExperienceResponseDTO> experienceResponseDTOs = list.stream()
                .map(ExperienceMapper::toResponse).toList();
        return experienceResponseDTOs;
    }

    public List<StatisticResponseDTO> getAllStatistics() {
        List<Statistic> list = statisticRepository.findAll();
        List<StatisticResponseDTO> statisticResponseDTOs = list.stream()
                .map(StatisticMapper::toResponse).toList();
        return statisticResponseDTOs;
    }

    public List<SocialLinkResponseDTO> getAllSocialLinks() {
        List<SocialLink> list = socialLinkRepository.findAll();
        List<SocialLinkResponseDTO> socialLinkResponseDTOs = list.stream()
                .map(SocialLinkMapper::toResponse).toList();
        return socialLinkResponseDTOs;
    }
}