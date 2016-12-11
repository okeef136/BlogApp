/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thesoftwareguild.capstoneblog.dao;

import com.thesoftwareguild.capstoneblog.dto.Post;
import com.thesoftwareguild.capstoneblog.dto.PostStatus;
import java.time.LocalDate;
import java.util.ArrayList;
import static java.util.Arrays.asList;
import java.util.List;
import java.util.Set;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;

public class BlogDaoTest {

    private BlogDao dao;
    // content, dateCreated, datePosted, categories, tags, comments
    Post post1 = new Post("admin", "Title 1", "This is my first post. Something or other"
            , LocalDate.parse("2016-11-15"), LocalDate.parse("2016-11-15")
            , new ArrayList<>(asList("company", "marketing")) // category
            , new ArrayList<>(asList("#Test", "#IThinkIPassed")) // tag
            , new ArrayList<>(asList("Add some more content, then it's good"))); // comment

    Post publishedPost1 = new Post("admin", "Test Published Post 1", "This is a published post for testing."
            , LocalDate.parse("2016-11-15"), LocalDate.parse("2016-11-15")
            , new ArrayList<>(asList("testing"))
            , new ArrayList<>(asList("#Test", "#PublishedTest"))
            , new ArrayList<>(asList("Looks good.")));

    Post publishedPost2 = new Post("admin", "Test Published Post 2", "Another test published post."
            , LocalDate.parse("2016-11-15"), LocalDate.parse("2016-11-15")
            , new ArrayList<>(asList("testing"))
            , new ArrayList<>(asList("#Test", "#PublishedTest"))
            , new ArrayList<>());

    Post pendingPost1 = new Post("admin", "Test Pending Post 1", "This is a pending post for testing."
            , LocalDate.parse("2016-11-15"), LocalDate.parse("2016-11-15")
            , new ArrayList<>(asList("testing"))
            , new ArrayList<>(asList("#Test", "#PendingTest"))
            , new ArrayList<>(asList("Needs to be approved.")));

    Post pendingPost2 = new Post("admin", "Test Pending Post 2", "Another test PENDING post."
            , LocalDate.parse("2016-11-15"), LocalDate.parse("2016-11-15")
            , new ArrayList<>(asList("testing"))
            , new ArrayList<>(asList("#Test", "#PendingTest2"))
            , new ArrayList<>());

    public BlogDaoTest() {
        ApplicationContext ctx
                = new ClassPathXmlApplicationContext("test-applicationContext.xml");
        dao = ctx.getBean("blogDao", BlogDao.class);
    }

    @BeforeClass
    public static void setUpClass() {
    }

    @AfterClass
    public static void tearDownClass() {
    }

    @Before
    public void setUp() {
        ApplicationContext ctx
                = new ClassPathXmlApplicationContext("test-applicationContext.xml");
        JdbcTemplate jdbcTemplate = ctx.getBean("jdbcTemplate", org.springframework.jdbc.core.JdbcTemplate.class);

        // remove old data
        jdbcTemplate.update("DELETE from posts;");
        jdbcTemplate.update("DELETE from categories;");
        jdbcTemplate.update("DELETE from tags;");
        jdbcTemplate.update("DELETE from comments;");

        // Set status of test posts here
        post1.setStatus(PostStatus.PENDING);
        publishedPost1.setStatus(PostStatus.PUBLISHED);
        publishedPost2.setStatus(PostStatus.PUBLISHED);
        pendingPost1.setStatus(PostStatus.PENDING);
        pendingPost2.setStatus(PostStatus.PENDING);

        // Add test posts to Dao
        dao.addPost(post1);
        dao.addPost(publishedPost1);
        dao.addPost(publishedPost2);
        dao.addPost(pendingPost1);
        dao.addPost(pendingPost2);

    }

    @After
    public void tearDown() {
    }

    /**
     * Test of addPost method, of class BlogDao.
     */
    @Test
    public void testAddPost() {
        System.out.println("addPost");
        Post post = new Post("admin", "Title1", "This post is added in a test. That's all it's good for."
                , LocalDate.parse("2016-11-15"), LocalDate.parse("2016-11-15")
                , new ArrayList<>(asList("TestCategory"))
                , new ArrayList<>(asList("#TestTwo"))
                , new ArrayList<>(asList("test comment. Nothing else.")));
        Post expResult = post;
        Post result = dao.addPost(post);
        assertEquals(expResult, result);
    }

    /**
     * Test of updatePost method, of class BlogDao.
     */
    @Test
    public void testUpdatePost() {
        System.out.println("updatePost");
        Post post = pendingPost2;
        // add some stuff
        String contentToAdd = "... some tail end stuff for testing.";
        String content = pendingPost2.getContent();
        content += contentToAdd;
        pendingPost2.setContent(content);
        List<String> categories = pendingPost2.getCategories();
        List<String> tags = pendingPost2.getTags();
        List<String> comments = pendingPost2.getComments();
        categories.add("Updates");
        tags.add("#Update");
        tags.add("#JUnit");
        comments.add("This is an update comment for JUnit testing.");
        
        dao.updatePost(post);
        Post updatedPost = dao.getPostById(pendingPost2.getPostId());
        List<String> updatedCategories = updatedPost.getCategories();
        List<String> updatedTags = updatedPost.getTags();
        assertTrue(updatedPost.getContent().equals(content));
        assertTrue(updatedCategories.contains("Updates"));
        assertTrue(updatedTags.contains("#Update"));
    }

    /**
     * Test of removePost method, of class BlogDao.
     */
    @Test
    public void testRemovePost() {
        System.out.println("removePost");
        int postId = publishedPost1.getPostId();
        List<Post> list = dao.getAllPublishedPosts();
        // assert that we have the post to begin with
        assertTrue(dao.getPostById(postId).getContent().equals(publishedPost1.getContent()));
        dao.removePost(postId);
        // check that the post is gone
        assertNull(dao.getPostById(postId));
    }

    /**
     * Test of getAllPublishedPosts method, of class BlogDao.
     */
    @Test
    public void testGetAllPublishedPosts() {
        System.out.println("getAllPublishedPosts");
        List<Post> expResult = new ArrayList<>(asList(publishedPost1, publishedPost2));
        List<Post> result = dao.getAllPublishedPosts();
        List<Integer> ids = new ArrayList<>();
        assertEquals(expResult.size(), result.size());
        for (Post p : result) {
            assertTrue(p.getStatus().toString().equals(PostStatus.PUBLISHED.toString()));
        }
    }

    /**
     * Test of getAllPendingPosts method, of class BlogDao.
     */
    @Test
    public void testGetAllPendingPosts() {
        System.out.println("getAllPendingPosts");
        List<Post> expResult = new ArrayList<>(asList(post1, pendingPost1, pendingPost2));
        List<Post> result = dao.getAllPendingPosts();
        assertEquals(expResult.size(), result.size());
         for (Post p : result) {
            assertTrue(p.getStatus().toString().equals(PostStatus.PENDING.toString()));
        }
    }
    
    /**
     * Test of getAllCategories method, of class BlogDao.
     */
    //@Test
//    public void testGetAllCategories() {
//        System.out.println("getAllCategories");
//        List<Post> expResult = new ArrayList<>(asList(post1));
//        List<Post> result = dao.getAllPostsInQueue();
//        assertEquals(expResult.size(), result.size());
//        assertTrue(result.get(0).getPostId() == post1.getPostId());
//        assertTrue(result.get(0).getStatus()
//                .toString().equals(PostStatus.IN_QUEUE.toString()));
//    }

    /**
     * Test of getPostById method, of class BlogDao.
     */
    @Test
    public void testGetPostById() {
        System.out.println("getPostById");
        int id = pendingPost1.getPostId();
        Post expResult = pendingPost1;
        Post result = dao.getPostById(id);
        assertTrue(expResult.getContent().equals(result.getContent()));
    }

}
