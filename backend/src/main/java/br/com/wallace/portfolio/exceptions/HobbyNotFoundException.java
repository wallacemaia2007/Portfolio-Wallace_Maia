package br.com.wallace.portfolio.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class HobbyNotFoundException extends RuntimeException {
    public HobbyNotFoundException(String message) {
        super(message);
    }
}
