package com.kamikadze328.lab4lol.demo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.kamikadze328.lab4lol.demo.model.data.User;
import com.kamikadze328.lab4lol.demo.service.UserService;

import java.security.Principal;

@RestController
@RequestMapping("account")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @CrossOrigin
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> createUser(@RequestBody User newUser) {
        if (userService.findByUsername(newUser.getUsername()) != null) {
            logger.error("username Already exist " + newUser.getUsername());
            return new ResponseEntity<>(
                    new RuntimeException("user with username " + newUser.getUsername() + "already exist "),
                    HttpStatus.CONFLICT);
        }

        logger.info("user registered " + newUser.getUsername());

        return new ResponseEntity<>(userService.save(newUser), HttpStatus.CREATED);
    }

    @CrossOrigin
    @RequestMapping("/login")
    public Principal user(Principal principal) {
        logger.info("user logged "+principal);
        return principal;
    }



}
