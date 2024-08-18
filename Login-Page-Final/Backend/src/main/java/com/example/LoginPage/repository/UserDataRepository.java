package com.example.LoginPage.repository;

import com.example.LoginPage.entity.UserData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDataRepository extends JpaRepository<UserData, Long> {
}
