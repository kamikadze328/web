package com.kamikadze328.lab4lol.demo.repositories;

import com.kamikadze328.lab4lol.demo.model.data.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
