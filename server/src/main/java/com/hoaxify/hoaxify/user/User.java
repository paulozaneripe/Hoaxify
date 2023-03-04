package com.hoaxify.hoaxify.user;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue
    private long id;

    @NotNull
    @Size(min = 4, max = 255)
    private String displayName;

    @NotNull(message = "{hoaxify.constraints.username.NotNull.message}")
    @Size(min = 4, max = 255)
    private String username;

    @NotNull
    @Size(min = 8, max = 255)
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message="{hoaxify.constraints.password.Pattern.message}")
    private String password;

}
