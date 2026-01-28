package br.com.wallace.portfolio.mappers;

import br.com.wallace.portfolio.dtos.FAQResponseDTO;
import br.com.wallace.portfolio.dtos.requests.FAQRequestDTO;
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
                faq.getIcon());
    }

    public static void updateEntityFromDTO(FAQRequestDTO dto, FAQ entity) {
        if (dto == null || entity == null) {
            return;
        }

        if (dto.question() != null)
            entity.setQuestion(dto.question());
        if (dto.answer() != null)
            entity.setAnswer(dto.answer());
        if (dto.category() != null)
            entity.setCategory(dto.category());
        if (dto.order() != null)
            entity.setOrder(dto.order());
        if (dto.icon() != null)
            entity.setIcon(dto.icon());
    }

    public static FAQ toEntity(FAQRequestDTO dto) {
        if (dto == null) {
            return null;
        }

        FAQ faq = new FAQ();
        faq.setQuestion(dto.question());
        faq.setAnswer(dto.answer());
        faq.setCategory(dto.category());
        faq.setOrder(dto.order());
        faq.setIcon(dto.icon());

        return faq;
    }
}
