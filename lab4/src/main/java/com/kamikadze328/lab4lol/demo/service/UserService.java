package com.kamikadze328.lab4lol.demo.service;

import com.kamikadze328.lab4lol.demo.model.data.User;

public interface UserService {
    User save(User user);

    User findByUsername(String username);
}
