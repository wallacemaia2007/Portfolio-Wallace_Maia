package br.com.wallace.portfolio.dtos.requests;

import java.util.List;

public record AboutRequestDTO(
        String introduction,
        String profileImage,
        String backgroundImage,
        List<String> aboutTexts,
        String philosophyTitle,
        String philosophyText,
        List<String> futureGoals) {

}
