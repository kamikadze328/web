package com.kamikadze328.lab4lol.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.kamikadze328.lab4lol.demo.model.data.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
