package br.com.wallace.portfolio.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.wallace.portfolio.dtos.AboutResponseDTO;
import br.com.wallace.portfolio.dtos.EducationResponseDTO;
import br.com.wallace.portfolio.dtos.ExperienceResponseDTO;
import br.com.wallace.portfolio.dtos.FAQResponseDTO;
import br.com.wallace.portfolio.dtos.HobbyResponseDTO;
import br.com.wallace.portfolio.dtos.JourneyItemResponseDTO;
import br.com.wallace.portfolio.dtos.ProfileResponseDTO;
import br.com.wallace.portfolio.dtos.ProjectResponseDTO;
import br.com.wallace.portfolio.dtos.SkillResponseDTO;
import br.com.wallace.portfolio.dtos.SocialLinkResponseDTO;
import br.com.wallace.portfolio.dtos.StatisticResponseDTO;
import br.com.wallace.portfolio.dtos.TestimonialResponseDTO;
import br.com.wallace.portfolio.dtos.ValueResponseDTO;
import br.com.wallace.portfolio.exceptions.ProfileNotFoundException;
import br.com.wallace.portfolio.exceptions.ProjectsNotFoundException;
import br.com.wallace.portfolio.mappers.AboutMapper;
import br.com.wallace.portfolio.mappers.EducationMapper;
import br.com.wallace.portfolio.mappers.ExperienceMapper;
import br.com.wallace.portfolio.mappers.FAQMapper;
import br.com.wallace.portfolio.mappers.HobbyMapper;
import br.com.wallace.portfolio.mappers.JourneyItemMapper;
import br.com.wallace.portfolio.mappers.ProfileMapper;
import br.com.wallace.portfolio.mappers.ProjectMapper;
import br.com.wallace.portfolio.mappers.SkillMapper;
import br.com.wallace.portfolio.mappers.SocialLinkMapper;
import br.com.wallace.portfolio.mappers.StatisticMapper;
import br.com.wallace.portfolio.mappers.TestimonialMapper;
import br.com.wallace.portfolio.mappers.ValueMapper;
import br.com.wallace.portfolio.model.entities.About;
import br.com.wallace.portfolio.model.entities.PersonalInfo;
import br.com.wallace.portfolio.model.entities.Project;
import br.com.wallace.portfolio.model.repository.AboutRepository;
import br.com.wallace.portfolio.model.repository.EducationRepository;
import br.com.wallace.portfolio.model.repository.ExperienceRepository;
import br.com.wallace.portfolio.model.repository.FAQRepository;
import br.com.wallace.portfolio.model.repository.HobbyRepository;
import br.com.wallace.portfolio.model.repository.JourneyItemRepository;
import br.com.wallace.portfolio.model.repository.PersonalInfoRepository;
import br.com.wallace.portfolio.model.repository.ProjectRepository;
import br.com.wallace.portfolio.model.repository.SkillRepository;
import br.com.wallace.portfolio.model.repository.SocialLinkRepository;
import br.com.wallace.portfolio.model.repository.StatisticRepository;
import br.com.wallace.portfolio.model.repository.TestimonialRepository;
import br.com.wallace.portfolio.model.repository.ValueRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PortfolioService {

    private final PersonalInfoRepository personalInfoRepository;
    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final ExperienceRepository experienceRepository;
    private final SocialLinkRepository socialLinkRepository;
    private final StatisticRepository statisticRepository;
    private final AboutRepository aboutRepository;
    private final EducationRepository educationRepository;
    private final FAQRepository faqRepository;
    private final HobbyRepository hobbyRepository;
    private final JourneyItemRepository journeyItemRepository;
    private final TestimonialRepository testimonialRepository;
    private final ValueRepository valueRepository;

    public ProfileResponseDTO getProfile() {
        PersonalInfo personalInfo = personalInfoRepository.findById(1)
                .orElseThrow(() -> new ProfileNotFoundException("Profile not found"));
        return ProfileMapper.toResponse(personalInfo);
    }

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

    public List<SkillResponseDTO> getAllSkills() {
        return skillRepository.findAll().stream()
                .map(SkillMapper::toResponse)
                .toList();
    }

    public List<ExperienceResponseDTO> getAllExperiences() {
        return experienceRepository.findAll().stream()
                .map(ExperienceMapper::toResponse)
                .toList();
    }

    public List<StatisticResponseDTO> getAllStatistics() {
        return statisticRepository.findAll().stream()
                .map(StatisticMapper::toResponse)
                .toList();
    }

    public List<SocialLinkResponseDTO> getAllSocialLinks() {
        return socialLinkRepository.findAll().stream()
                .map(SocialLinkMapper::toResponse)
                .toList();
    }

    public AboutResponseDTO getAbout() {
        About about = aboutRepository.findAll().stream().findFirst().orElse(null);
        return AboutMapper.toResponse(about);
    }

    public List<EducationResponseDTO> getAllEducation() {
        return educationRepository.findAll().stream()
                .map(EducationMapper::toResponse)
                .toList();
    }

    public List<FAQResponseDTO> getAllFaqs() {
        return faqRepository.findAll().stream()
                .map(FAQMapper::toResponse)
                .toList();
    }

    public List<HobbyResponseDTO> getAllHobbies() {
        return hobbyRepository.findAll().stream()
                .map(HobbyMapper::toResponse)
                .toList();
    }

    public List<JourneyItemResponseDTO> getAllJourneyItems() {
        return journeyItemRepository.findAll().stream()
                .map(JourneyItemMapper::toResponse)
                .toList();
    }

    public List<TestimonialResponseDTO> getAllTestimonials() {
        return testimonialRepository.findAll().stream()
                .map(TestimonialMapper::toResponse)
                .toList();
    }

    public List<ValueResponseDTO> getAllValues() {
        return valueRepository.findAll().stream()
                .map(ValueMapper::toResponse)
                .toList();
    }
}