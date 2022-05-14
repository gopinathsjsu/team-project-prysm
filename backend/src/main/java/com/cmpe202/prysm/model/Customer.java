package com.cmpe202.prysm.model;

public class Customer {

    private String username;
    private String password;
    private String name;
    private int rewards;

    public Customer() {
    }

    public Customer(String username, String password, String name, int rewards) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.rewards = rewards;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getRewards() {
        return rewards;
    }

    public void setRewards(int rewards) {
        this.rewards = rewards;
    }
}
