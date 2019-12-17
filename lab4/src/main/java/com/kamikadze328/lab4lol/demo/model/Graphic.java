package com.kamikadze328.lab4lol.demo.model;

import com.kamikadze328.lab4lol.demo.model.data.PointForClient;
import org.springframework.stereotype.Component;
import com.kamikadze328.lab4lol.demo.model.data.Point;

@Component
public class Graphic {
    private boolean isInArea(double x, double y, double r) {
        boolean square = x >= -r / 2.0 && x <= 0 && y <= r && y >= 0;
        boolean triangle = (y >= -(x + r)) && y <= 0 && x <= 0;
        boolean sector = (x * x + y * y) <= r * r / 4.0 && x >= 0 && y <= 0;
        return triangle || square || sector;
    }

    public boolean isInArea(Point point) {
        return isInArea(point.getX(), point.getY(), point.getR());
    }
    public boolean isInArea(PointForClient point) {
        return isInArea(point.getX(), point.getY(), point.getR());
    }

}
