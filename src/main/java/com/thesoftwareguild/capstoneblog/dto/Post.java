/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thesoftwareguild.capstoneblog.dto;

import java.time.LocalDate;
import java.util.List;

public class Post {

    private int postId;
    private String author;
    private String title;
    private String content;
    private LocalDate dateCreated;
    private LocalDate datePosted;
    private PostStatus status;
    private List<String> categories;
    private List<String> tags;
    private List<String> comments;

    public Post(String author, String title, String content, LocalDate dateCreated, LocalDate datePosted,
            List<String> categories, List<String> tags, List<String> comments) {
        this.author = author;
        this.title = title;
        this.content = content;
        this.dateCreated = dateCreated;
        this.datePosted = datePosted;
        this.status = PostStatus.PENDING;
        this.categories = categories;
        this.tags = tags;
        this.comments = comments;
    }

    public Post() {
    }

    /**
     * @return the postId
     */
    public int getPostId() {
        return postId;
    }

    /**
     * @param postId the postId to set
     */
    public void setPostId(int postId) {
        this.postId = postId;
    }

    /**
     * @return the author
     */
    public String getAuthor() {
        return author;
    }

    /**
     * @param author the author to set
     */
    public void setAuthor(String author) {
        this.author = author;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * @return the content
     */
    public String getContent() {
        return content;
    }

    /**
     * @param content the content to set
     */
    public void setContent(String content) {
        this.content = content;
    }

    /**
     * @return the dateCreated
     */
    public String getDateCreated() {
        return dateCreated.toString();
    }
    
    public LocalDate getLocalDateCreated() {
        return dateCreated;
    }

    /**
     * @param dateCreated the dateCreated to set
     */
    public void setDateCreated(LocalDate dateCreated) {
        this.dateCreated = dateCreated;
    }

    /**
     * @return the datePosted
     */
    public String getDatePosted() {
        return datePosted.toString();
    }
    
    public LocalDate getLocalDatePosted() {
        return datePosted;
    }

    /**
     * @param datePosted the datePosted to set
     */
    public void setDatePosted(LocalDate datePosted) {
        this.datePosted = datePosted;
    }

    /**
     * @return the status
     */
    public PostStatus getStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(PostStatus status) {
        this.status = status;
    }

    /**
     * @return the categories
     */
    public List<String> getCategories() {
        return categories;
    }

    /**
     * @param categories the categories to set
     */
    public void setCategories(List<String> categories) {
        this.categories = categories;
    }

    /**
     * @return the tags
     */
    public List<String> getTags() {
        return tags;
    }

    /**
     * @param tags the tags to set
     */
    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    /**
     * @return the comments
     */
    public List<String> getComments() {
        return comments;
    }

    /**
     * @param comments the comments to set
     */
    public void setComments(List<String> comments) {
        this.comments = comments;
    }

}
