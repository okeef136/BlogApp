/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thesoftwareguild.capstoneblog.controller;

import com.thesoftwareguild.capstoneblog.dao.StaticPageDao;
import com.thesoftwareguild.capstoneblog.dto.Page;
import com.thesoftwareguild.capstoneblog.dto.PageStatus;
import java.util.List;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 *
 * @author Christopher
 */
@Controller
public class StaticPageController {

    private StaticPageDao dao;

    // ToDo:  Two mapping required to access the StaticPage.jsp and access Home from StaticPage.jsp
    @Inject
    public StaticPageController(StaticPageDao dao) {
        this.dao = dao;
    }

    @RequestMapping(value = "/page/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Page getPage(@PathVariable("id") int id) {
        return dao.getPageById(id);
    }
    
    @RequestMapping(value = "/staticpage/{id}", method = RequestMethod.GET)
    public String displayStaticPage(@PathVariable("id") int id, Model model) {
        
        Page page = dao.getPageById(id);
        model.addAttribute("page", page);
        return "template";
    }
    
    @RequestMapping(value = "/pages", method = RequestMethod.GET)
    @ResponseBody
    public List<Page> getAllStaticPages() {
        return dao.getAllStaticPages();
    }

    @RequestMapping(value = {"/template"}, method = RequestMethod.GET)
    public String displayTemplatePage() {
        return "template";
    }

    @RequestMapping(value = "/createPage", method = RequestMethod.POST)
    public String createPage(HttpServletRequest req, Model model) {
        // persist the incoming post
        String title = req.getParameter("title");
        String content = req.getParameter("content");
        if (content.isEmpty()) {
            return "redirect:addPage";
        }
        Page p = new Page();
        p.setTitle(title);
        p.setContent(content);

        dao.addPage(p);
        model.addAttribute("page", p);

        return "redirect:staticpage/" + p.getPageId();
    }


    @RequestMapping(value = "/page/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removePage(@PathVariable("id") int id) {
        dao.removePage(id);
    }

    @RequestMapping(value = "/page/{id}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void editPage(@PathVariable("id") int id, @RequestBody Page page) {

        Page p = dao.getPageById(id);
        p.setContent(page.getContent());
        p.setTitle(page.getTitle());

        dao.updatePage(p);
    }
}
