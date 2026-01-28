package br.com.wallace.portfolio.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class AboutAlreadyExistsException extends RuntimeException {
    public AboutAlreadyExistsException(String message) {
        super(message);
    }
    
}
