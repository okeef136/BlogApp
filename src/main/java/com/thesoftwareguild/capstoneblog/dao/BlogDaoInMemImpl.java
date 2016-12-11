/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.thesoftwareguild.capstoneblog.dao;

import com.thesoftwareguild.capstoneblog.dto.Post;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class BlogDaoInMemImpl implements BlogDao {
    
    private Map<Integer, Post> blogPosts = new HashMap<>();
    // used to assign ids to posts - simulates the auto increment
    // primary key for posts in a database
    private static int postIdCounter = 0;

    public BlogDaoInMemImpl() {
        blogPosts = new HashMap<>();

    }

    @Override
    public Post addPost(Post post) {
        
        // assign the current counter values as the postId
        post.setPostId(postIdCounter);
        
        // increment the counter so it's ready for use for the next post
        postIdCounter++;
        blogPosts.put(post.getPostId(), post);
        
        return post;
    }

    @Override
    public void updatePost(Post post) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void removePost(int postId) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public List<Post> getAllPublishedPosts() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public List<Post> getAllPendingPosts() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Post getPostById(int id) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public List<String> getAllCategories() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void createCategory(String category) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
