/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thesoftwareguild.capstoneblog.dao;

import com.thesoftwareguild.capstoneblog.dto.Post;
import java.util.List;

public interface BlogDao {

    Post addPost(Post post);

    void updatePost(Post post);

    void removePost(int postId);

    List<Post> getAllPublishedPosts();

    List<Post> getAllPendingPosts();
    
    List<String> getAllCategories();

    Post getPostById(int id);
    
    void createCategory(String category);
}
