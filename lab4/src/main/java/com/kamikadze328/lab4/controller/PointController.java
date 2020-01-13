package com.kamikadze328.lab4.controller;

import com.kamikadze328.lab4.model.Graphic;
import com.kamikadze328.lab4.model.PointForClient;
import com.kamikadze328.lab4.model.PointFromClient;
import com.kamikadze328.lab4.model.data.Point;
import com.kamikadze328.lab4.repositories.PointRepository;
import com.kamikadze328.lab4.repositories.UserRepository;
import org.hibernate.validator.constraints.URL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RestController
@URL
public class PointController {
    private final PointRepository pointRepository;
    private final UserRepository userRepository;
    private final Graphic graphic;

    @Autowired
    PointController(PointRepository pointRepository, UserRepository userRepository, Graphic graphic) {
        this.pointRepository = pointRepository;
        this.graphic = graphic;
        this.userRepository = userRepository;
    }

    @CrossOrigin
    @GetMapping("/points")
    Collection<PointForClient> allPoints(Principal user) {
        System.out.println("all points request from "+user.getName());
        List<PointForClient> pointsForClient = new ArrayList<>();
        Collection<Point> points = pointRepository.findAllUserPoints(userRepository.findByUsername(user.getName()));
        for (Point p : points) {
            pointsForClient.add(new PointForClient(p.getX(), p.getY(), p.getR(), p.getResult()));
        }
        return pointsForClient;
    }


    //В поле data PointFromClient требуется передать строку вида AaBbCcDd,
    // где все восемь знаков - это цифры
    // где Aa - информация о первой четверти графика
    // ...
    // Dd - информация о четвёртой четверти
    // Первое число в паре (A) - форма фигуры.
    //0, 1, 2, и др.
    // Второе число - размер.
    // 1- маленький, 2 - большой.
    @CrossOrigin
    @PostMapping("/points")
    PointForClient newPoint(@RequestBody PointFromClient pointFromClient, Principal user) {
        Point newPoint = new Point();
        newPoint.setX(pointFromClient.getX());
        newPoint.setY(pointFromClient.getY());
        newPoint.setR(pointFromClient.getR());
        newPoint.setResult(graphic.isInArea(pointFromClient));
        newPoint.setUser(userRepository.findByUsername(user.getName()));
        Point p = pointRepository.save(newPoint);
        return new PointForClient(p.getX(), p.getY(), p.getR(), p.getResult());
    }
}
