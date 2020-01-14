package com.kamikadze328.lab4.model;

import lombok.Data;

@Data
public class PointFromClient {
    private Double x;
    private Double y;
    private Double r;
    private String graph;

    public PointFromClient(Double x, Double y, Double r, String graph) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.graph = graph;
    }
}
