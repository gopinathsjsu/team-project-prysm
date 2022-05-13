package com.cmpe202.prysm.model;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BookWithRewards {

    private boolean bookWithRewards;
    private List<Room> selectedRooms;

    public BookWithRewards(boolean bookWithRewards, List<Room> selectedRoms) {
        this.bookWithRewards = bookWithRewards;
        this.selectedRooms = selectedRoms;
    }

    public boolean isBookWithRewards() {
        return bookWithRewards;
    }

    public void setBookWithRewards(boolean bookWithRewards) {
        this.bookWithRewards = bookWithRewards;
    }

    public List<Room> getSelectedRooms() {
        return selectedRooms;
    }

    public void setSelectedRooms(List<Room> selectedRooms) {
        this.selectedRooms = selectedRooms;
    }
}
