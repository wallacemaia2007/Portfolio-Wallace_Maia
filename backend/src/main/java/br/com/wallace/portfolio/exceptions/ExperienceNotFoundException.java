package br.com.wallace.portfolio.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ExperienceNotFoundException extends RuntimeException {

    public ExperienceNotFoundException(String message) {
        super(message);
    }
}
