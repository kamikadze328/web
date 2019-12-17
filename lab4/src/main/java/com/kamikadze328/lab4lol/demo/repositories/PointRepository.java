package com.kamikadze328.lab4lol.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.kamikadze328.lab4lol.demo.model.data.Point;
import com.kamikadze328.lab4lol.demo.model.data.User;

import java.util.Collection;


public interface PointRepository extends JpaRepository<Point, Long> {
    @Query("SELECT u FROM Point u WHERE u.user = ?1 ORDER BY u.id DESC")
    Collection<Point> findAllUserPoints(User user);
}
