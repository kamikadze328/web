package com.kamikadze328.lab4.service;

import com.kamikadze328.lab4.model.data.User;

public interface UserService {
    User save(User user);

    User findByUsername(String username);
}
