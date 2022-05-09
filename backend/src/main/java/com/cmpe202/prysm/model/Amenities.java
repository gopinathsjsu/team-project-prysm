package com.cmpe202.prysm.model;

public class Amenities {

    private Boolean daily_continental_breakfast;
    private Boolean fitness_room;
    private Boolean swimming_pool;
    private Boolean jacuzzi;
    private Boolean daily_parking;
    private Boolean all_meals;

    public Amenities(Boolean daily_continental_breakfast, Boolean fitness_room, Boolean swimming_pool, Boolean jacuzzi, Boolean daily_parking, Boolean all_meals) {
        this.daily_continental_breakfast = daily_continental_breakfast;
        this.fitness_room = fitness_room;
        this.swimming_pool = swimming_pool;
        this.jacuzzi = jacuzzi;
        this.daily_parking = daily_parking;
        this.all_meals = all_meals;
    }

    public Boolean getDaily_continental_breakfast() {
        return daily_continental_breakfast;
    }

    public void setDaily_continental_breakfast(Boolean daily_continental_breakfast) {
        this.daily_continental_breakfast = daily_continental_breakfast;
    }

    public Boolean getFitness_room() {
        return fitness_room;
    }

    public void setFitness_room(Boolean fitness_room) {
        this.fitness_room = fitness_room;
    }

    public Boolean getSwimming_pool() {
        return swimming_pool;
    }

    public void setSwimming_pool(Boolean swimming_pool) {
        this.swimming_pool = swimming_pool;
    }

    public Boolean getJacuzzi() {
        return jacuzzi;
    }

    public void setJacuzzi(Boolean jacuzzi) {
        this.jacuzzi = jacuzzi;
    }

    public Boolean getDaily_parking() {
        return daily_parking;
    }

    public void setDaily_parking(Boolean daily_parking) {
        this.daily_parking = daily_parking;
    }

    public Boolean getAll_meals() {
        return all_meals;
    }

    public void setAll_meals(Boolean all_meals) {
        this.all_meals = all_meals;
    }
}
