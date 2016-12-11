package com.thesoftwareguild.capstoneblog.dao;

import com.thesoftwareguild.capstoneblog.dto.Page;
import com.thesoftwareguild.capstoneblog.dto.PageStatus;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

public class StaticPageDaoDbImpl implements StaticPageDao {

    private static final String SQL_SELECT_PAGE
            = "SELECT * FROM staticPages WHERE page_id = ?";
    private static final String SQL_INSERT_PAGE
            = "INSERT INTO staticPages (title, content) values (?, ?)";
    private static final String SQL_UPDATE_PAGE
            = "UPDATE staticPages SET title = ?, content = ? WHERE page_id = ?";
    private static final String SQL_DELETE_PAGE
            = "DELETE FROM staticPages WHERE page_id = ?";
    private static final String SQL_SELECT_ALL_PAGES
            = "SELECT * FROM staticPages";

    private JdbcTemplate jdbcTemplate;

    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public Page addPage(Page page) {
        jdbcTemplate.update(SQL_INSERT_PAGE,
                page.getTitle(),
                page.getContent()
        );

        page.setPageId(jdbcTemplate.queryForObject("SELECT LAST_INSERT_ID()",
                Integer.class));

        return page;
    }

    @Override
    public void updatePage(Page page) {
        // Updates the page
        jdbcTemplate.update(SQL_UPDATE_PAGE,
                page.getTitle(),
                page.getContent(),
                page.getPageId());
    }

    @Override
    public void removePage(int pageId) {
        // Delete the page
        jdbcTemplate.update(SQL_DELETE_PAGE, pageId);
    }

    @Override
    public Page getPageById(int pageId) {
        try {
            Page p = jdbcTemplate.queryForObject(SQL_SELECT_PAGE,
                    new PageMapper(), pageId);
            return p;

        } catch (EmptyResultDataAccessException ex) {
            return null;
        }
    }

    @Override
    public List<Page> getAllStaticPages() {
        List<Page> pages = jdbcTemplate.query(SQL_SELECT_ALL_PAGES, new PageMapper());

        return pages;
    }

    private static final class PageMapper implements RowMapper<Page> {

        @Override
        public Page mapRow(ResultSet rs, int rowNum) throws SQLException {
            Page page = new Page();
            page.setPageId(rs.getInt("page_id"));
            page.setTitle(rs.getString("title"));
            page.setContent(rs.getString("content"));
         
            return page;
        }

    }
}
