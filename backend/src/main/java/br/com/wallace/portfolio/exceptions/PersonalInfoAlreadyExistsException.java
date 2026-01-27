package br.com.wallace.portfolio.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class PersonalInfoAlreadyExistsException extends RuntimeException {
    public PersonalInfoAlreadyExistsException(String message) {
        super(message);
    }

}
