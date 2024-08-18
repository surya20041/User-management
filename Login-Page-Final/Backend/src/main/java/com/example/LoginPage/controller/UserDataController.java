package com.example.LoginPage.controller;

import com.example.LoginPage.entity.UserData;
import com.example.LoginPage.service.UserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserDataController {
    @Autowired
    UserDataService userDataService;

    @PostMapping("/addnewuser")
    public ResponseEntity<UserData> addUser(@RequestBody UserData user) {
        return ResponseEntity.ok().body(this.userDataService.addUser(user));
    }

    @GetMapping("/getusersdata")
    public ResponseEntity<List<UserData>> getBooks() {
        return ResponseEntity.ok().body(this.userDataService.getUsersData());
    }

    @PutMapping("/updateuser")
    public ResponseEntity<UserData> updateUser(@RequestBody UserData user) {
        return ResponseEntity.ok().body(this.userDataService.updateUser(user));
    }

    @PutMapping("/updateuseractivation/{id}")
    public ResponseEntity<UserData> updateUserActivation(@PathVariable Long id, @RequestParam boolean isActive) {
      return ResponseEntity.ok().body(this.userDataService.updateUserActivation(id, isActive));
    }
    
    
}
