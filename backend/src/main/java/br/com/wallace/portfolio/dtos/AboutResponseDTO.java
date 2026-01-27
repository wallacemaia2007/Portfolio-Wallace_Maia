package br.com.wallace.portfolio.dtos;

import java.util.List;

public record AboutResponseDTO(
        Long id,
        String introduction,
        String profileImage,
        String backgroundImage,
        List<String> aboutTexts,
        List<JourneyItemResponseDTO> journeyItems,
        List<EducationResponseDTO> education,
        List<ValueResponseDTO> values,
        List<HobbyResponseDTO> hobbies,
        String philosophyTitle,
        String philosophyText,
        List<String> futureGoals) {
}
