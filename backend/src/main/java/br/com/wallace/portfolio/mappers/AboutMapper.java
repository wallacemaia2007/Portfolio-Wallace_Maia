package br.com.wallace.portfolio.mappers;

import java.util.List;
import java.util.stream.Collectors;

import br.com.wallace.portfolio.dtos.AboutResponseDTO;
import br.com.wallace.portfolio.dtos.EducationResponseDTO;
import br.com.wallace.portfolio.dtos.HobbyResponseDTO;
import br.com.wallace.portfolio.dtos.JourneyItemResponseDTO;
import br.com.wallace.portfolio.dtos.ValueResponseDTO;
import br.com.wallace.portfolio.model.entities.About;

public class AboutMapper {

    public static AboutResponseDTO toResponse(About about) {
        if (about == null) {
            return null;
        }

        List<String> aboutTexts = about.getAboutTexts();
        List<String> futureGoals = about.getFutureGoals();

        List<JourneyItemResponseDTO> journeyItems = about.getJourneyItems().stream()
                        .map(JourneyItemMapper::toResponse)
                        .collect(Collectors.toList());

        List<EducationResponseDTO> education = about.getEducationList().stream()
                        .map(EducationMapper::toResponse)
                        .collect(Collectors.toList());

        List<ValueResponseDTO> values = about.getValues().stream()
                        .map(ValueMapper::toResponse)
                        .collect(Collectors.toList());

        List<HobbyResponseDTO> hobbies = about.getHobbies().stream()
                        .map(HobbyMapper::toResponse)
                        .collect(Collectors.toList());

        return new AboutResponseDTO(
                about.getId(),
                about.getIntroduction(),
                about.getProfileImage(),
                about.getBackgroundImage(),
                aboutTexts,
                journeyItems,
                education,
                values,
                hobbies,
                about.getPhilosophyTitle(),
                about.getPhilosophyText(),
                futureGoals
        );
    }
}
