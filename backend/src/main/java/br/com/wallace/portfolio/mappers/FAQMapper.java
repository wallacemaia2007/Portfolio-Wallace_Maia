package br.com.wallace.portfolio.mappers;

import br.com.wallace.portfolio.dtos.FAQResponseDTO;
import br.com.wallace.portfolio.model.entities.FAQ;

public class FAQMapper {

    public static FAQResponseDTO toResponse(FAQ faq) {
        if (faq == null) {
            return null;
        }

        return new FAQResponseDTO(
                faq.getId(),
                faq.getQuestion(),
                faq.getAnswer(),
                faq.getCategory(),
                faq.getOrder(),
                faq.getIcon()
        );
    }
}
