package com.kamikadze328.lab4lol.demo.model;

import org.springframework.stereotype.Component;
import com.kamikadze328.lab4lol.demo.model.data.Point;

@Component
public class Graphic {
    private boolean isInArea(double x, double y, double r) {
        boolean triangle = x <= 0 && y >= 0 && y <= (x + r)/2;
        boolean square = x >= 0 && y >= 0 && x <= r && y <= r/2;
        boolean sector = x >= 0 && y <= 0 && Math.sqrt(x*x + y*y) <= r/2;
        return triangle || square || sector;
    }

    public boolean isInArea(Point point) {
        return isInArea(point.getX(), point.getY(), point.getR());
    }

}
