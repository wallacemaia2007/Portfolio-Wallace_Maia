package br.com.wallace.portfolio.mappers;

import br.com.wallace.portfolio.dtos.TestimonialResponseDTO;
import br.com.wallace.portfolio.dtos.requests.TestimonialRequestDTO;
import br.com.wallace.portfolio.model.entities.Testimonial;

public class TestimonialMapper {

    public static TestimonialResponseDTO toResponse(Testimonial testimonial) {
        if (testimonial == null) {
            return null;
        }

        return new TestimonialResponseDTO(
                testimonial.getId(),
                testimonial.getAuthor(),
                testimonial.getRole(),
                testimonial.getCompany(),
                testimonial.getText(),
                testimonial.getAvatar(),
                testimonial.getRating());
    }

    public static void updateEntityFromDTO(TestimonialRequestDTO dto,
            Testimonial entity) {
        if (dto == null || entity == null) {
            return;
        }

        if (dto.author() != null)
            entity.setAuthor(dto.author());
        if (dto.role() != null)
            entity.setRole(dto.role());
        if (dto.company() != null)
            entity.setCompany(dto.company());
        if (dto.text() != null)
            entity.setText(dto.text());
        if (dto.avatar() != null)
            entity.setAvatar(dto.avatar());
        if (dto.rating() != null)
            entity.setRating(dto.rating());
    }

    public static Testimonial toEntity(TestimonialRequestDTO dto) {
        if (dto == null) {
            throw new RuntimeException("Testimonial Not Found");
        }

        Testimonial testimonial = new Testimonial();
        testimonial.setAuthor(dto.author());
        testimonial.setRole(dto.role());
        testimonial.setCompany(dto.company());
        testimonial.setText(dto.text());
        testimonial.setAvatar(dto.avatar());
        testimonial.setRating(dto.rating());

        return testimonial;
    }
}
