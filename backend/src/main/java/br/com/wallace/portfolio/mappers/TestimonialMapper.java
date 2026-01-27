package br.com.wallace.portfolio.mappers;

import br.com.wallace.portfolio.dtos.TestimonialResponseDTO;
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
                testimonial.getRating()
        );
    }
}
