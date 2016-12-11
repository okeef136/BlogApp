/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thesoftwareguild.capstoneblog.dao;


import com.thesoftwareguild.capstoneblog.dto.User;
import java.util.List;


public interface UserDao {
    
    List<User> getAllUsers();

    User addUser(User newUser);

    void deleteUser(String username);

    User getUserByUsername(String username);
}
