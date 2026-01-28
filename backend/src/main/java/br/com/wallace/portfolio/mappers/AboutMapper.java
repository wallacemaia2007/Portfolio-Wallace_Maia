package br.com.wallace.portfolio.mappers;

import java.util.List;

import br.com.wallace.portfolio.dtos.AboutResponseDTO;
import br.com.wallace.portfolio.dtos.requests.AboutRequestDTO;
import br.com.wallace.portfolio.model.entities.About;

public class AboutMapper {

    public static AboutResponseDTO toResponse(About about) {
        if (about == null) {
            return null;
        }

        List<String> aboutTexts = about.getAboutTexts();
        List<String> futureGoals = about.getFutureGoals();

        return new AboutResponseDTO(
                about.getId(),
                about.getIntroduction(),
                about.getProfileImage(),
                about.getBackgroundImage(),
                aboutTexts,
                about.getPhilosophyTitle(),
                about.getPhilosophyText(),
                futureGoals);
    }

    public static void updateEntityFromRequest(AboutRequestDTO dto, About entity) {
        if (dto == null || entity == null) {
            return;
        }

        if (dto.introduction() != null)
            entity.setIntroduction(dto.introduction());
        if (dto.profileImage() != null)
            entity.setProfileImage(dto.profileImage());
        if (dto.backgroundImage() != null)
            entity.setBackgroundImage(dto.backgroundImage());
        if (dto.aboutTexts() != null)
            entity.setAboutTexts(dto.aboutTexts());
        if (dto.philosophyTitle() != null)
            entity.setPhilosophyTitle(dto.philosophyTitle());
        if (dto.philosophyText() != null)
            entity.setPhilosophyText(dto.philosophyText());
        if (dto.futureGoals() != null)
            entity.setFutureGoals(dto.futureGoals());
    }

    public static About toEntity(AboutRequestDTO dto) {
        if (dto == null) {
            return null;
        }

        About about = new About();
        about.setIntroduction(dto.introduction());
        about.setProfileImage(dto.profileImage());
        about.setBackgroundImage(dto.backgroundImage());
        about.setAboutTexts(dto.aboutTexts());
        about.setPhilosophyTitle(dto.philosophyTitle());
        about.setPhilosophyText(dto.philosophyText());
        about.setFutureGoals(dto.futureGoals());

        return about;
    }
}
