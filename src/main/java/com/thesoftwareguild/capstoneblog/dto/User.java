/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thesoftwareguild.capstoneblog.dto;

import java.util.ArrayList;
import java.util.List;

public class User {

    private String username;
    private String password;
    private List<String> authorities = new ArrayList<>();
    private int isSuper;
    
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getIsSuper() {
        return isSuper;
    }

    public void setIsSuper(int isSuper) {
        this.isSuper = isSuper;
    }



    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<String> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(List<String> authorities) {
        this.authorities = authorities;
    }

    public void addAuthority(String authority) {
        authorities.add(authority);
    }
}
