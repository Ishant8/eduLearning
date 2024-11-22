package com.education.eduAPI.exception;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.Date;

@RestControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler( AccessDeniedException.class)
    public ResponseEntity<CustomErrorResponse> handleAccessDeniedException( AccessDeniedException e)
    {
        System.out.println("In the Exception Handler");
        CustomErrorResponse customError = new CustomErrorResponse(403, e.getMessage(), new Date(System.currentTimeMillis()));
        return new ResponseEntity<>(customError, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(CustomEntityNotFoundException.class)
    public ResponseEntity<CustomErrorResponse> handleEntityNotFoundException(CustomEntityNotFoundException e) {
        CustomErrorResponse customError = new CustomErrorResponse(404,e.getMessage(), new Date(System.currentTimeMillis()));
        return new ResponseEntity<>(customError, HttpStatus.NOT_FOUND);
    }


    @ExceptionHandler(MalformedJwtException.class)
    public ResponseEntity<CustomErrorResponse> handleMalformedJwtException(MalformedJwtException e) {
        CustomErrorResponse customError = new CustomErrorResponse(401,e.getMessage(), new Date(System.currentTimeMillis()));
        return new ResponseEntity<>(customError, HttpStatus.UNAUTHORIZED);

    }

    @ExceptionHandler(SignatureException.class)
    public ResponseEntity<CustomErrorResponse> handleSignatureException(SignatureException e) {
        CustomErrorResponse customError = new CustomErrorResponse(401,e.getMessage(), new Date(System.currentTimeMillis()));
        return new ResponseEntity<>(customError, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<CustomErrorResponse> handleSignatureException(BadCredentialsException e) {
        CustomErrorResponse customError = new CustomErrorResponse(401,e.getMessage(), new Date(System.currentTimeMillis()));
        return new ResponseEntity<>(customError, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<CustomErrorResponse> handleExpiredJwtException(ExpiredJwtException e) {
        CustomErrorResponse customError = new CustomErrorResponse(401,e.getMessage(), new Date(System.currentTimeMillis()));
        return new ResponseEntity<>(customError, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<CustomErrorResponse> handleNoResourceFoundException(NoResourceFoundException e) {
        CustomErrorResponse customError = new CustomErrorResponse(404,e.getMessage(), new Date(System.currentTimeMillis()));
        return new ResponseEntity<>(customError, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(InternalAuthenticationServiceException.class)
    public ResponseEntity<CustomErrorResponse> handleNoInternalAuthenticationServiceException(InternalAuthenticationServiceException e) {
        CustomErrorResponse customError = new CustomErrorResponse(401,e.getMessage(), new Date(System.currentTimeMillis()));
        return new ResponseEntity<>(customError, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<CustomErrorResponse> handleException(Exception e) {
        e.printStackTrace();
        CustomErrorResponse customError = new CustomErrorResponse(500,e.getMessage(), new Date(System.currentTimeMillis()));
        return new ResponseEntity<>(customError, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
