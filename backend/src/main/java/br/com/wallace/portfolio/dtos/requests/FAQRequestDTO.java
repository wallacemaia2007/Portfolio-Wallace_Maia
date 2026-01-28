package br.com.wallace.portfolio.dtos.requests;

public record FAQRequestDTO(String question,
        String answer,
        String category,
        Integer order,
        String icon) {

}
