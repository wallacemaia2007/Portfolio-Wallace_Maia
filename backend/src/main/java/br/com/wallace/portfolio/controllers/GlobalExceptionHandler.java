package br.com.wallace.portfolio.controllers;

import java.util.Arrays;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import br.com.wallace.portfolio.dtos.ApiError;
import br.com.wallace.portfolio.exceptions.AboutAlreadyExistsException;
import br.com.wallace.portfolio.exceptions.AboutNotFoundException;
import br.com.wallace.portfolio.exceptions.EducationNotFoundException;
import br.com.wallace.portfolio.exceptions.ExperienceNotFoundException;
import br.com.wallace.portfolio.exceptions.FAQNotFoundException;
import br.com.wallace.portfolio.exceptions.HobbyNotFoundException;
import br.com.wallace.portfolio.exceptions.JourneyItemNotFoundException;
import br.com.wallace.portfolio.exceptions.PersonalInfoAlreadyExistsException;
import br.com.wallace.portfolio.exceptions.ProfileNotFoundException;
import br.com.wallace.portfolio.exceptions.ProjectsNotFoundException;
import br.com.wallace.portfolio.exceptions.SkillNotFoundException;
import br.com.wallace.portfolio.exceptions.SocialLinkNotFoundException;
import br.com.wallace.portfolio.exceptions.StatisticAlreadyExistsException;
import br.com.wallace.portfolio.exceptions.StatisticNotFoundException;
import br.com.wallace.portfolio.exceptions.TestimonialNotFoundException;
import br.com.wallace.portfolio.exceptions.ValueNotFoundException;
import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice(basePackages = "br.com.wallace.portfolio.controllers")
public class GlobalExceptionHandler {

    @ExceptionHandler(AboutAlreadyExistsException.class)
    public ResponseEntity<ApiError> aboutAlreadyExistsExceptionHandler(
            AboutAlreadyExistsException ex,
            HttpServletRequest request) {
        ApiError error = new ApiError(
                HttpStatus.CONFLICT.value(),
                HttpStatus.CONFLICT.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI(),
                Arrays.asList("About section already exists."));
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }

    @ExceptionHandler(PersonalInfoAlreadyExistsException.class)
    public ResponseEntity<ApiError> personalInfoAlreadyExistsExceptionHandler(
            PersonalInfoAlreadyExistsException ex,
            HttpServletRequest request) {
        ApiError error = new ApiError(
                HttpStatus.CONFLICT.value(),
                HttpStatus.CONFLICT.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI(),
                Arrays.asList("Personal information already exists."));
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }

    @ExceptionHandler(StatisticAlreadyExistsException.class)
    public ResponseEntity<ApiError> statisticAlreadyExistsExceptionHandler(
            StatisticAlreadyExistsException ex,
            HttpServletRequest request) {
        ApiError error = new ApiError(
                HttpStatus.CONFLICT.value(),
                HttpStatus.CONFLICT.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI(),
                Arrays.asList("Statistic already exists."));
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }

    // ========== NOT FOUND (404) - Not Found Exceptions ==========

    @ExceptionHandler(AboutNotFoundException.class)
    public ResponseEntity<ApiError> aboutNotFoundExceptionHandler(
            AboutNotFoundException ex,
            HttpServletRequest request) {
        ApiError error = new ApiError(
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI(),
                Arrays.asList("About section not found."));
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(EducationNotFoundException.class)
    public ResponseEntity<ApiError> educationNotFoundExceptionHandler(
            EducationNotFoundException ex,
            HttpServletRequest request) {
        ApiError error = new ApiError(
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI(),
                Arrays.asList("Education not found."));
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(ExperienceNotFoundException.class)
    public ResponseEntity<ApiError> experienceNotFoundExceptionHandler(
            ExperienceNotFoundException ex,
            HttpServletRequest request) {
        ApiError error = new ApiError(
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI(),
                Arrays.asList("Experience not found."));
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(FAQNotFoundException.class)
    public ResponseEntity<ApiError> faqNotFoundExceptionHandler(
            FAQNotFoundException ex,
            HttpServletRequest request) {
        ApiError error = new ApiError(
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI(),
                Arrays.asList("FAQ not found."));
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(HobbyNotFoundException.class)
    public ResponseEntity<ApiError> hobbyNotFoundExceptionHandler(
            HobbyNotFoundException ex,
            HttpServletRequest request) {
        ApiError error = new ApiError(
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI(),
                Arrays.asList("Hobby not found."));
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(JourneyItemNotFoundException.class)
    public ResponseEntity<ApiError> journeyItemNotFoundExceptionHandler(
            JourneyItemNotFoundException ex,
            HttpServletRequest request) {
        ApiError error = new ApiError(
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI(),
                Arrays.asList("Journey item not found."));
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(ProfileNotFoundException.class)
    public ResponseEntity<ApiError> profileNotFoundExceptionHandler(
            ProfileNotFoundException ex,
            HttpServletRequest request) {
        ApiError error = new ApiError(
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI(),
                Arrays.asList("Profile not found."));
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(ProjectsNotFoundException.class)
    public ResponseEntity<ApiError> projectsNotFoundExceptionHandler(
            ProjectsNotFoundException ex,
            HttpServletRequest request) {
        ApiError error = new ApiError(
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI(),
                Arrays.asList("Project not found."));
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(SkillNotFoundException.class)
    public ResponseEntity<ApiError> skillNotFoundExceptionHandler(
            SkillNotFoundException ex,
            HttpServletRequest request) {
        ApiError error = new ApiError(
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI(),
                Arrays.asList("Skill not found."));
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(SocialLinkNotFoundException.class)
    public ResponseEntity<ApiError> socialLinkNotFoundExceptionHandler(
            SocialLinkNotFoundException ex,
            HttpServletRequest request) {
        ApiError error = new ApiError(
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI(),
                Arrays.asList("Social link not found."));
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(StatisticNotFoundException.class)
    public ResponseEntity<ApiError> statisticNotFoundExceptionHandler(
            StatisticNotFoundException ex,
            HttpServletRequest request) {
        ApiError error = new ApiError(
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI(),
                Arrays.asList("Statistic not found."));
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(TestimonialNotFoundException.class)
    public ResponseEntity<ApiError> testimonialNotFoundExceptionHandler(
            TestimonialNotFoundException ex,
            HttpServletRequest request) {
        ApiError error = new ApiError(
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI(),
                Arrays.asList("Testimonial not found."));
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(ValueNotFoundException.class)
    public ResponseEntity<ApiError> valueNotFoundExceptionHandler(
            ValueNotFoundException ex,
            HttpServletRequest request) {
        ApiError error = new ApiError(
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI(),
                Arrays.asList("Value not found."));
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ApiError> methodArgumentTypeMismatchHandler(
            MethodArgumentTypeMismatchException ex,
            HttpServletRequest request) {
        ApiError error = new ApiError(
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                "Invalid request parameter",
                request.getRequestURI(),
                Arrays.asList(
                        "Parameter '" + ex.getName() + "' should be of type " + ex.getRequiredType().getSimpleName()));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> globalExceptionHandler(
            Exception ex,
            HttpServletRequest request) {
        ApiError error = new ApiError(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),
                "An unexpected error occurred",
                request.getRequestURI(),
                Arrays.asList(ex.getMessage() != null ? ex.getMessage() : "Unknown error"));
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}
