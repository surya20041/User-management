// UserDataServiceImpl.java
package com.example.LoginPage.serviceImpl;

import com.example.LoginPage.entity.UserData;
import com.example.LoginPage.repository.UserDataRepository;
import com.example.LoginPage.service.UserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserDataServiceImpl implements UserDataService {
    @Autowired
    private UserDataRepository userRepository;

    @Override
    public UserData addUser(UserData user) {
        return userRepository.save(user);
    }

    @Override
    public List<UserData> getUsersData() {
        return userRepository.findAll();
    }

    @Override
    public UserData updateUser(UserData user) {
        return userRepository.save(user);
    }

    @Override
    public UserData updateUserActivation(Long id, boolean isActive) {
        Optional<UserData> userDataOptional = userRepository.findById(id);
        if (userDataOptional.isPresent()) {
            UserData userData = userDataOptional.get();
            userData.setActive(isActive);
            return userRepository.save(userData);
            
        } else {
            throw new RuntimeException("User not found with id: " + id);
        }
    }
}

