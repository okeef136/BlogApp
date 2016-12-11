/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thesoftwareguild.capstoneblog.dao;

import com.thesoftwareguild.capstoneblog.dto.Post;
import com.thesoftwareguild.capstoneblog.dto.PostStatus;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

public class BlogDaoDbImpl implements BlogDao {

    private static final String SQL_INSERT_POST
            = "INSERT INTO posts (author, title, content, date_created, date_posted, status) values (?, ?, ?, ?, ?, ?)";
    private static final String SQL_INSERT_CATEGORY
            = "INSERT INTO categories (post_id, category) values (?, ?)";
    private static final String SQL_CREATE_CATEGORY
            = "INSERT INTO categories (category) values (?)";
    private static final String SQL_INSERT_TAG
            = "INSERT INTO tags (post_id, name) values (?, ?)";
    private static final String SQL_INSERT_COMMENT
            = "INSERT INTO comments (post_id, comment) values (?, ?)";
    private static final String SQL_DELETE_POST
            = "DELETE FROM posts WHERE post_id = ?";
    private static final String SQL_DELETE_CATEGORIES
            = "DELETE FROM categories WHERE post_id = ?";
    private static final String SQL_DELETE_TAGS
            = "DELETE FROM tags WHERE post_id = ?";
    private static final String SQL_DELETE_COMMENTS
            = "DELETE FROM comments WHERE post_id = ?";
    private static final String SQL_SELECT_POST
            = "SELECT * FROM posts WHERE post_id = ?";
    private static final String SQL_SELECT_COMMENT
            = "SELECT comment FROM comments WHERE post_id = ?";
    private static final String SQL_UPDATE_POST
            = "UPDATE posts SET author = ?, title = ?, content = ?, date_created = ?, date_posted = ?, status = ? WHERE post_id = ?";
    private static final String SQL_SELECT_ALL_PUBLISHED_POSTS
            = "SELECT * FROM posts WHERE status = 'PUBLISHED'";
    private static final String SQL_SELECT_ALL_PENDING_POSTS
            = "SELECT * FROM posts WHERE status = 'PENDING'";
    private static final String SQL_SELECT_ALL_CATEGORIES
            = "SELECT * FROM categories";
    private static final String SQL_GET_CATEGORIES
            = "SELECT * FROM categories WHERE post_id = ?";
    private static final String SQL_GET_TAGS
            = "SELECT * FROM tags WHERE post_id = ?";
    private static final String SQL_GET_COMMENTS
            = "SELECT * FROM comments WHERE post_id = ?";

    private JdbcTemplate jdbcTemplate;

    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public Post addPost(Post post) {
        jdbcTemplate.update(SQL_INSERT_POST,
                post.getAuthor(),
                post.getTitle(),
                post.getContent(),
                post.getDateCreated(),
                post.getDatePosted(),
                post.getStatus().toString());
        post.setPostId(jdbcTemplate.queryForObject("SELECT LAST_INSERT_ID()",
                Integer.class));

        // Insert categories
        List<String> categories = post.getCategories();
        for (String category : categories) {
            jdbcTemplate.update(SQL_INSERT_CATEGORY, post.getPostId(), category);
        }

        // Insert tags
        List<String> tags = post.getTags();
        for (String tag : tags) {
            jdbcTemplate.update(SQL_INSERT_TAG, post.getPostId(), tag);
        }

        // Insert comments
        List<String> comments = post.getComments();
        for (String comment : comments) {
            jdbcTemplate.update(SQL_INSERT_COMMENT, post.getPostId(), comment);
        }
        return post;
    }

    @Override
    public void updatePost(Post post) {
        jdbcTemplate.update(SQL_UPDATE_POST,
                post.getAuthor(),
                post.getTitle(),
                post.getContent(),
                post.getDateCreated(),
                post.getDatePosted(),
                post.getStatus().toString(),
                post.getPostId());

        // Save all current categories, tags, comments
        List<String> categories = post.getCategories();
        List<String> tags = post.getTags();
        List<String> comments = post.getComments();

        // Clear all categories, tags, comments from the DB
        jdbcTemplate.update(SQL_DELETE_CATEGORIES, post.getPostId());
        jdbcTemplate.update(SQL_DELETE_TAGS, post.getPostId());
        jdbcTemplate.update(SQL_DELETE_COMMENTS, post.getPostId());

        // Add everything back in
        for (String category : categories) {
            jdbcTemplate.update(SQL_INSERT_CATEGORY, post.getPostId(), category);
        }

        for (String tag : tags) {
            jdbcTemplate.update(SQL_INSERT_TAG, post.getPostId(), tag);
        }

        for (String comment : comments) {
            jdbcTemplate.update(SQL_INSERT_COMMENT, post.getPostId(), comment);
        }
    }

    @Override
    public void removePost(int postId) {
        // Delete categories, tags, comments first
        jdbcTemplate.update(SQL_DELETE_CATEGORIES, postId);
        jdbcTemplate.update(SQL_DELETE_TAGS, postId);
        jdbcTemplate.update(SQL_DELETE_COMMENTS, postId);

        // Delete the post
        jdbcTemplate.update(SQL_DELETE_POST, postId);
    }

    @Override
    public Post getPostById(int postId) {
        try {
            Post p = jdbcTemplate.queryForObject(SQL_SELECT_POST,
                    new PostMapper(), postId);

            // set post categories, tags, comments
            setPostCategories(p);
            setPostTags(p);
            setPostComments(p);

            return p;

        } catch (EmptyResultDataAccessException ex) {
            // there were no results for the given post id;
            // just return null in this case
            return null;
        }
    }

    @Override
    public List<Post> getAllPublishedPosts() {
       // List<Post> posts = new ArrayList<>();
        List<Post> posts = jdbcTemplate.query(SQL_SELECT_ALL_PUBLISHED_POSTS, new PostMapper());

        // Get associated categories
        for (Post p : posts) {
            setPostCategories(p);
            setPostTags(p);
            setPostComments(p);
        }

        Collections.sort(posts, 
                Collections.reverseOrder(
                        (Post o1, Post o2) -> o1.getLocalDatePosted()
                                .compareTo(o2.getLocalDatePosted())));
        return posts;
    }

    @Override
    public List<Post> getAllPendingPosts() {
      //  List<Post> posts = new ArrayList<>();
        List<Post> posts = jdbcTemplate.query(SQL_SELECT_ALL_PENDING_POSTS, new PostMapper());

        // Get associated categories
        for (Post p : posts) {
            setPostCategories(p);
            setPostTags(p);
            setPostComments(p);
        }
        
        Collections.sort(posts, 
                Collections.reverseOrder(
                        (Post o1, Post o2) -> o1.getDateCreated()
                                .compareTo(o2.getDateCreated())));
        return posts;
    }

    @Override
    public List<String> getAllCategories() {
        List<String> categories = jdbcTemplate.query(SQL_SELECT_ALL_CATEGORIES, new CategoryMapper());
        Set<String> categoriesWithoutDupes = new HashSet(categories);
        
        return new ArrayList<>(categoriesWithoutDupes);
    }
    
    @Override
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public void createCategory(String category) {
        List<String> currentCategories = getAllCategories();
        for (String cat : currentCategories) {
            if (cat.equalsIgnoreCase(category)) {
                // category already exists, just return
                // without creating a new one
                return;
            }
        }
        // insert new category
        jdbcTemplate.update(SQL_CREATE_CATEGORY, category);
    }

    private void setPostCategories(Post p) {
        p.setCategories(jdbcTemplate.query(SQL_GET_CATEGORIES, new CategoryMapper(), p.getPostId()));
    }

    private void setPostTags(Post p) {
        p.setTags(jdbcTemplate.query(SQL_GET_TAGS, new TagMapper(), p.getPostId()));
    }

    private void setPostComments(Post p) {
        p.setComments(jdbcTemplate.query(SQL_GET_COMMENTS, new CommentMapper(), p.getPostId()));
    }

    private static final class PostMapper implements RowMapper<Post> {

        @Override
        public Post mapRow(ResultSet rs, int rowNum) throws SQLException {
            Post post = new Post();
            post.setPostId(rs.getInt("post_id"));
            post.setAuthor(rs.getString("author"));
            post.setTitle(rs.getString("title"));
            post.setContent(rs.getString("content"));
            post.setDateCreated(LocalDate.parse(rs.getString("date_created")));
            post.setDatePosted(LocalDate.parse(rs.getString("date_posted")));
            post.setStatus(PostStatus.valueOf(rs.getString("status")));

            return post;
        }
    }

    private static final class CategoryMapper implements RowMapper<String> {

        @Override
        public String mapRow(ResultSet rs, int rowNum) throws SQLException {
            return rs.getString("category");
        }
    }

    private static final class TagMapper implements RowMapper<String> {

        @Override
        public String mapRow(ResultSet rs, int rowNum) throws SQLException {
            return rs.getString("name");
        }

    }

    private static final class CommentMapper implements RowMapper<String> {

        @Override
        public String mapRow(ResultSet rs, int rowNum) throws SQLException {
            return rs.getString("comment");
        }

    }

}
