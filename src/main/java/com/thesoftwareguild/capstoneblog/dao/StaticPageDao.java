/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thesoftwareguild.capstoneblog.dao;

import com.thesoftwareguild.capstoneblog.dto.Page;
import java.util.List;

/**
 *
 * @author Christopher
 */
public interface StaticPageDao {
    Page addPage(Page page);
    
    void updatePage(Page page);
    
    void removePage(int pageId);
    
    Page getPageById(int pageId);
    
    List<Page> getAllStaticPages();
    
}
