package com.kamikadze328.lab4lol.demo.model.data;

import lombok.Data;

@Data
public class PointForClient {
    private Double x;
    private Double y;
    private Double r;
    private Boolean result;

    public PointForClient(Double x, Double y, Double r, boolean b) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = b;
    }
}
