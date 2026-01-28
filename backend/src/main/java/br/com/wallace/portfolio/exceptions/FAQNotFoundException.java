package br.com.wallace.portfolio.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class FAQNotFoundException extends RuntimeException {
    public FAQNotFoundException(String message) {
        super(message);
    }
    
}
