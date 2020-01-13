package com.kamikadze328.lab4.model;

import lombok.Data;

@Data
public class PointFromClient {
    private Double x;
    private Double y;
    private Double r;
    private String data;

    public PointFromClient(Double x, Double y, Double r, String data) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.data = data;
    }
}
