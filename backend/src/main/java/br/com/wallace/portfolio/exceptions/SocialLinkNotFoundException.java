package br.com.wallace.portfolio.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class SocialLinkNotFoundException extends RuntimeException {

    public SocialLinkNotFoundException(String message) {
        super(message);
    }

}
