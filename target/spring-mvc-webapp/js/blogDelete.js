/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global React */
$(document).ready(function () {
    $('#pub-tags').tagsInput(); // invokes the jquery.tagsinput.js library
    loadPublishedPosts();
    tinyMCE.init({
        selector: '#create-text-area',
 
    });
    
     // delete button on post was clicked
    $(document).on('click', 'button[id*="delete"]', (function (event) {
        var buttonId = $(this).attr('id');
        var postId = buttonId.replace("delete", ""); // get id from buttonId
        var answer = confirm("Do you really want to delete this post?");
        if (answer === true) {
            $.ajax({
                type: 'DELETE',
                url: 'post/' + postId
            }).success(function () {
                clearPostTable();
                loadPublishedPosts();
            });
        }
    }));
  
    $(document).on('click', 'button[id*="cat"]', (function (event) {
        var buttonCat = $(this).attr('id');
        //var content = document.getElementById(buttonCat).innerHTML;
        var category = buttonCat.replace("cat", ""); // get id from buttonId
        $( "h4#category-name" )
            .html(function(){
                return category;
        });
         $( "h4#tag-name" )
            .html(function(){
                return "";
        });
        loadSearchPosts(category);
    }));
    
    $(document).on('click', 'button[id*="tag"]', (function (event) {
        
        var buttonTag = $(this).attr('id');
        var tag = buttonTag.replace("tag", ""); // get id from buttonId
        $( "h4#tag-name" )
            .html(function(){
                return tag;
        });
        $( "h4#category-name" )
            .html(function(){
                return "";
        });
        loadSearchPostsTags(tag);
    }));
    
});

//==========
// VARIABLES
//==========

//==========
// FUNCTIONS
//==========
function loadPublishedPosts() {
    $.ajax({
        url: "published"
    }).success(function (posts) {
        // function to fill the published posts div here
        createHomePostDivs(posts, status);
        fillHomePostsDiv(posts);
        createCategoryLi(posts);
        fillCategoryLi(posts);
        createTagLi(posts);
        fillTagLi(posts);
    });
}

function loadSearchPosts(category){
    $.ajax({
        url: "published"
    }).success(function (posts, status) {
        if (category == "All")
        {
            createHomePostDivs(posts, status);
            fillPostsDiv(posts);
        } else {
            createSearchDivs(posts, category);
            fillSearchDiv(posts, category);
        }
    });
}

function clearPostTable() {
    $('#content-divs').empty();
}

function clearTinyMCEWithTitle() {
    $('#title').val('');
    $('#category-type').val('');
    tinyMCE.get('create-text-area').setContent('');
}

function removeTags(tags) {
    $.each(tags, function (index, tag) {
        $('#tags').removeTag(tag);
    });
}

function loadSearchPostsTags(tag){
    $.ajax({
        url: "published"
    }).success(function (posts, status) {
        if (tag == "All")
        {
            createHomePostDivs(posts, status);
            fillPostsDiv(posts);
        } else {
            createSearchDivsTags(posts, tag);
            fillSearchDivTags(posts, tag);
        }
    });
}

function createSearchDivsTags(posts, tag) {
    clearPostTable();
    // Grab the tbody element that will hold the new list of posts
    var cTable = $('#content-divs-home');
    // Iterate through each of the JSON objects in the test post data
    // and render to the summary table
    
    //creates divs for each pending post for use by reactJS
    
    $.each(posts, function (index, post) {
        var postTag = post.tags;
            if ($.inArray(tag,postTag)!==-1)
                {
        
            var postId = post.postId;
            cTable.attr({
               class: 'cTable'
            }).append($('<tr>')
                  .append($('<td>')
                           .append($('<div>')
                                  .attr({
                                      id: postId
                                 }))));
                                        
                }
});
}

function fillSearchDivTags(posts, tag) {
     
     $.each(posts, function (index, post) {
        //renders the html needed for each post
        var postTag = post.tags;
     if ($.inArray(tag,postTag)!==-1)
        {
        var postId = post.postId;
        var approveId = "approve" + postId;
        var editId = "edit" + postId;
        var deleteId = "delete" + postId;
        var date = post.dateCreated;
        var author = post.author;
        var title = post.title;
        var content = post.content;
        var Posty = React.createClass({
        render: function() {
        return (
                <div className = "light">
                    <div className = "row topPost" >
                        <div className = "date">
                            <p>{date}</p>
                        </div>
                        <div className = "date">
                        {author}
                        </div>
                        <div className = "author">
                            <button type="button" id = {deleteId} className ="btn btn-danger btn-sm delete2">
                            Delete
                            </button>
                        </div>
                    </div>
                    <p className = "postTitle" >{title}</p>
                    <div className="content" dangerouslySetInnerHTML={{__html: content}}></div>
                <div>
                    <br></br>
                </div>
                </div>
                )
        }
        });
    
    
    //creates a unique variable for each post that corresponds to div id in CreatePostDivs() so that the html can be rendered 
    ReactDOM.render(
        <Posty/>, 
        document.getElementById(postId)
                );
        }
    });

}

var categories = new Array("All");
function createCategoryLi(posts) {
//    clearPostTable();
    // Grab the tbody element that will hold the new list of posts
    var ul = $('#category-ul');
    
    $.each(posts, function (index, post) {
        //fill categories by going through each and grabbing all categories, no repeats 
        
        var categoriesLength = post.categories.length;
        var newCat = post.categories;
        
        var temp = [];
        for(var i = 0; i < newCat.length; i++)
        {
            if ($.inArray(newCat[i],categories)==-1)
            {
                categories.push(newCat[i]);
            }
        }
        
    });
    var test = $('#test-div');
    test.append($('<p>').text("foo"));
    for(var i = 0; i < categories.length; i++)
    {
        var catId = "categories" + i;
        ul.append($('<li>')
            .attr({
                id: catId
        }));
    }
}
    
 
function fillCategoryLi(posts)
{  
    for(var i = 0; i < categories.length; i++)
    {
        
        var cat = categories[i];
        var catId = "cat" + cat
        var NewLi = React.createClass({
            render: function() {
            return (
                <button className="catButt" id={catId}>{cat}</button>
                    )
            }
        });
    var category = "categories" + i;
        ReactDOM.render(
            <NewLi/>, 
            document.getElementById(category)
                        );
    
    }
}



function clearPostTable() {
    $('#content-divs-home').empty();
}


function createHomePostDivs(posts, status) {
    clearPostTable();
    // Grab the tbody element that will hold the new list of posts
    var cTable = $('#content-divs-home');
    // Iterate through each of the JSON objects in the test post data
    // and render to the summary table
    
    //creates divs for each pending post for use by reactJS
    $.each(posts, function (index, post) {
        var postId = post.postId;
        cTable.attr({
            class: 'cTable'
        }).append($('<tr>')
                .append($('<td>')
                        .append($('<div>')
                                .attr({
                                    id: postId
                                }))));
});
}

function fillHomePostsDiv(posts) {
     
     $.each(posts, function (index, post) {
        //renders the html needed for each post
        var postId = post.postId;
        var approveId = "approve" + postId;
        var editId = "edit" + postId;
        var deleteId = "delete" + postId;
        var date = post.datePosted;
        var author = post.author;
        var title = post.title;
        var content = post.content;
        var tagsTemp = post.tags.toString();
        var tags = "";
        if (tagsTemp != "")
        {
            var tagsArray = tagsTemp.split(',');
            for (var i = 0; i < tagsArray.length; i++)
            {
                tags = tags + "#" + tagsArray[i] + " ";
            }
        } else {tags = tagsTemp;}
        
        var Post = React.createClass({
        render: function() {
        return (
                <div className = "lightdelete">
                    <div className = "row topPost" >
                        <div className = "date">
                            <p>{date}</p>
                        </div>
                 <div className = "date">
                        {author}
                        </div>
                        <div className = "author">
                            <button type="button" id = {deleteId} className ="btn btn-danger btn-sm delete2">
                            Delete
                            </button>
                        </div>
                    </div>
                    <p className = "postTitle" >{title}</p>
                    <div className="content" dangerouslySetInnerHTML={{__html: content}}></div>
                    <div className="tags" id="pub-tags">{tags}</div>
                 
                    <div>
                        <br></br>
                    </div>
                </div>
                )
        }
        });
    
    //creates a unique variable for each post that corresponds to div id in CreatePostDivs() so that the html can be rendered 
    var post = "post" + index;
    ReactDOM.render(
        <Post/>, 
        document.getElementById(postId)
                );

    });

}

function createSearchDivs(posts, category) {
    clearPostTable();
    // Grab the tbody element that will hold the new list of posts
    var cTable = $('#content-divs-home');
    // Iterate through each of the JSON objects in the test post data
    // and render to the summary table
    
    //creates divs for each pending post for use by reactJS
    
    $.each(posts, function (index, post) {
        var posty = post;
        var posty2 = post;
        var nothing = "nothing";
        var postCat = post.categories;
        
            
            if ($.inArray(category,postCat)!==-1)
                {
        
            var postId = post.postId;
            cTable.attr({
               class: 'cTable'
            }).append($('<tr>')
                  .append($('<td>')
                           .append($('<div>')
                                  .attr({
                                      id: postId
                                 }))));
                }
});
}

function fillPostsDiv(posts) {
     
     $.each(posts, function (index, post) {
        //renders the html needed for each post
        var postId = post.postId;
        var approveId = "approve" + postId;
        var editId = "edit" + postId;
        var deleteId = "delete" + postId;
        var date = post.dateCreated;
        var author = post.author;
        var title = post.title;
        var content = post.content;
        var categories = post.categories.toString();
        var tagsTemp = post.tags.toString();
        var tags = "";
        if (tagsTemp != "")
        {
            var tagsArray = tagsTemp.split(',');
            for (var i = 0; i < tagsArray.length; i++)
            {
                tags = tags + "#" + tagsArray[i] + " ";
            }
        } else {tags = tagsTemp;}
        
        var Post = React.createClass({
        render: function() {
        return (
                <div className = "light">
                    <div className = "row topPost" >
                        <div className = "date">
                            <p>{date}</p>
                        </div>
                 <div className = "date">
                        {author}
                        </div>
                        <div className = "author">
                            <button type="button" id = {deleteId} className ="btn btn-danger btn-sm delete2">
                            Delete
                            </button>
                        </div>
                    </div>
                    <p className = "postTitle" >{title}</p>
                    <div className="content" dangerouslySetInnerHTML={{__html: content}}></div>
                    <div className="tags" id="pub-tags">{tags}</div>
                
                <div>
                    <br></br>
                </div>
                </div>
                )
        }
        });
    
    //creates a unique variable for each post that corresponds to div id in CreatePostDivs() so that the html can be rendered 
    var post = "post" + index;
    ReactDOM.render(
        <Post/>, 
        document.getElementById(postId)
                );

    });

}
function fillSearchDiv(posts, category) {
     
     $.each(posts, function (index, post) {
        //renders the html needed for each post
        var postCat = post.categories;
     if ($.inArray(category,postCat)!==-1)
        {
        var postId = post.postId;
        var approveId = "approve" + postId;
        var editId = "edit" + postId;
        var deleteId = "delete" + postId;
        var date = post.dateCreated;
        var author = post.author;
        var title = post.title;
        var content = post.content;
        var Post = React.createClass({
        render: function() {
        return (
                <div className = "light">
                    <div className = "row topPost" >
                        <div className = "date">
                            <p>{date}</p>
                        </div>
                 <div className = "date">
                        {author}
                        </div>
                        <div className = "author">
                            <button type="button" id = {deleteId} className ="btn btn-danger btn-sm delete2">
                            Delete
                            </button>
                        </div>
                    </div>
                    <p className = "postTitle" >{title}</p>
                    <div className="content" dangerouslySetInnerHTML={{__html: content}}></div>
                
                
                <div>
                    <br></br>
                </div>
                </div>
                )
        }
        });
        
    
    //creates a unique variable for each post that corresponds to div id in CreatePostDivs() so that the html can be rendered 
    var post = "post" + index;
    ReactDOM.render(
        <Post/>, 
        document.getElementById(postId)
                );
        }
    });
    }
function fillTagLi(posts)
{  
    for(var i = 0; i < tags.length; i++)
    {
        
        var tagz = tags[i];
        var tagId = "tag" + tagz;
        var NewTagLi = React.createClass({
            render: function() {
            return (
                <button className="catButt" id={tagId}>{tagz}</button>
                    )
            }
        });
        
    var tag = "tag" + i;
        ReactDOM.render(
            <NewTagLi/>, 
            document.getElementById(tag)
                        );
    
    }
}

var tags = new Array("All");
function createTagLi(posts) {
//    clearPostTable();
    // Grab the tbody element that will hold the new list of posts
    var ul = $('#tag-ul');
    
    $.each(posts, function (index, post) {
        //fill categories by going through each and grabbing all categories, no repeats 
        
        var tagsLength = post.tags.length;
        var newTag = post.tags;
        
        for(var i = 0; i < newTag.length; i++)
        {
            if ($.inArray(newTag[i],tags)==-1)
            {
                tags.push(newTag[i]);
            }
        }
        
    });
    
    for(var i = 0; i < tags.length; i++)
    {
        var tagId = "tag" + i;
        ul.append($('<li>')
            .attr({
                id: tagId
        }));
    }
}




