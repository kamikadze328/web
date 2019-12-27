package com.kamikadze328.lab4lol.demo.model.data;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    private String username;

    private String password;

    @Transient
    private String passwordConfirm;

}
