// UserDataService.java
package com.example.LoginPage.service;

import com.example.LoginPage.entity.UserData;

import java.util.List;

public interface UserDataService {
    UserData addUser(UserData user);
    List<UserData> getUsersData();
    UserData updateUser(UserData user);
    UserData updateUserActivation(Long id, boolean isActive);
}
