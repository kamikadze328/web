package com.kamikadze328.lab4.repositories;

import com.kamikadze328.lab4.model.data.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
