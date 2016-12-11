/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thesoftwareguild.capstoneblog.controller;

import com.thesoftwareguild.capstoneblog.dao.BlogDao;
import com.thesoftwareguild.capstoneblog.dto.Content;
import com.thesoftwareguild.capstoneblog.dto.Post;
import com.thesoftwareguild.capstoneblog.dto.PostStatus;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.inject.Inject;
import javax.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
public class HomeController {

    private BlogDao dao;

    @Inject
    public HomeController(BlogDao dao) {
        this.dao = dao;
    }

    @RequestMapping(value = {"/", "/home"}, method = RequestMethod.GET)
    public String displayHomePage() {
        return "home";
    }

    @RequestMapping(value = {"/admin"}, method = RequestMethod.GET)
    public String displayAdminPage() {
        return "admin";
    }

    @RequestMapping(value = {"/addPage"}, method = RequestMethod.GET)
    public String displayAddPage() {
        return "addPage";
    }

    @RequestMapping(value = {"/user"}, method = RequestMethod.GET)
    public String displayUserPage() {
        return "user";
    }

    @RequestMapping(value = {"/employee"}, method = RequestMethod.GET)
    public String displayEmployeePage() {
        return "employee";
    }

    @RequestMapping(value = "/post", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public Post createPost(@Valid @RequestBody Content content) {
        // persist the incoming post
        if (content.getTitle() == null || content.getTitle().isEmpty()) {
            content.setTitle("Untitled");
        }

        // parse categories into a list of strings
        List<String> categoriesList = new ArrayList<>();
        if (!content.getCategories().isEmpty())  {
            String[] categoriesArr = content.getCategories().split(",");
            categoriesList.addAll(Arrays.asList(categoriesArr));
        }
        

        // parse tags into a list of strings
        List<String> tagsList = new ArrayList<>();
        String[] tagsArr = content.getTags().split(",");
        tagsList.addAll(Arrays.asList(tagsArr));

        // TODO: parse comments
        Post p = new Post(content.getAuthor(), content.getTitle(), content.getText(), LocalDate.now() // date created
                , LocalDate.now() // date posted (set to created for now)
                , categoriesList // categories
                , tagsList // tags
                , new ArrayList<>()); // TODO: comments

        dao.addPost(p);
        return p;
    }

    @RequestMapping(value = "/post/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Post getPost(@PathVariable("id") int id) {
        return dao.getPostById(id);
    }

    @RequestMapping(value = "/post/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removePost(@PathVariable("id") int id) {
        dao.removePost(id);
    }

    @RequestMapping(value = "/post/{id}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void editPost(@PathVariable("id") int id, @RequestBody Content content) {

        Post p = dao.getPostById(id);
        p.setAuthor(content.getAuthor());
        p.setContent(content.getText());
        p.setTitle(content.getTitle());

        
        List<String> tagsList = new ArrayList<>();
        String[] tagsArr = content.getTags().split(",");
        tagsList.addAll(Arrays.asList(tagsArr));
        p.setTags(tagsList);
       
        dao.updatePost(p);
    }

    @RequestMapping(value = "/approve-post/{id}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void approvePost(@PathVariable("id") int id) {

        Post p = dao.getPostById(id);

        // set post status to 'PUBLISHED' and date posted to current time
        p.setStatus(PostStatus.PUBLISHED);
        p.setDatePosted(LocalDate.now());

        dao.updatePost(p);
    }

    @RequestMapping(value = "/published", method = RequestMethod.GET)
    @ResponseBody
    public List<Post> getAllPublishedPosts() {
        return dao.getAllPublishedPosts();
    }

    @RequestMapping(value = "/pending", method = RequestMethod.GET)
    @ResponseBody
    public List<Post> getAllPendingPosts() {
        return dao.getAllPendingPosts();
    }

    @RequestMapping(value = "/categories", method = RequestMethod.GET)
    @ResponseBody
    public List<String> getAllCategories() {
        return dao.getAllCategories();
    }
    
    @RequestMapping(value = "/category", method = RequestMethod.POST)
    @ResponseBody
    public void updateItem(@RequestBody String newCategory) {
      //  Item i = dao.getItemByName(item);
      String cat = newCategory.replace("category=", "");
      dao.createCategory(cat);
    }

}
