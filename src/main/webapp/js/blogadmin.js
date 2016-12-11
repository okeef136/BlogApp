/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global React */
$(document).ready(function () {
    $('#pub-tags').tagsInput();
    loadPendingPosts();
    loadCategories();
    loadStaticPages();
    tinyMCE.init({
        selector: '#create-text-area',
        theme: 'modern',
        plugins: [
            'advlist autolink lists link image charmap print preview hr anchor pagebreak',
            'searchreplace wordcount visualblocks visualchars code fullscreen',
            'insertdatetime media nonbreaking save table contextmenu directionality',
            'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc'
        ],
        toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
        toolbar2: 'print preview media | forecolor backcolor emoticons | codesample',
        image_advtab: true,
        templates: [
            {title: 'Test template 1', content: 'Test 1'},
            {title: 'Test template 2', content: 'Test 2'}
        ],
        content_css: [
            '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
            '//www.tinymce.com/css/codepen.min.css'
        ]

    });
    
    tinyMCE.init({
            selector: '#edit-static-page-text-area',
            theme: 'modern',
            plugins: [
                'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen',
                'insertdatetime media nonbreaking save table contextmenu directionality',
                'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc'
            ],
            toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            toolbar2: 'print preview media | forecolor backcolor emoticons | codesample',
            image_advtab: true,
            templates: [
                {title: 'Test template 1', content: 'Test 1'},
                {title: 'Test template 2', content: 'Test 2'}
            ],
            content_css: [
                '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                '//www.tinymce.com/css/codepen.min.css'
            ]
        });
   
    $('#tags').tagsInput(); // invokes the jquery.tagsinput.js library

    // submit a new post
    $('#submit-button').click(function (event) {
        // we don’t want the button to actually submit
        // we'll handle data submission via ajax
        event.preventDefault();
        var content = tinyMCE.activeEditor.getContent();
        if (!content)
            return; // don't allow blank/empty content
        var username = document.getElementById("author").innerHTML;
        // Make an Ajax call to the server. HTTP verb = POST, URL = post
        $.ajax({
            type: 'POST',
            url: 'post',
            // Build a JSON object from the data in the form
            data: JSON.stringify({
                author: username,
                title: $('#title').val(),
                text: content,
                categories: categoryClick,
                tags: $('#tags').val()
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'dataType': 'json'
        }).success(function (data, status) {
            // If the call succeeds, clear the form and reload the posts
            clearPostTable();
            loadPendingPosts();
            clearTinyMCEWithTitle();
            removeTags(data.tags);

        }).error(function (data, status) {
//            // #2 - Go through each of the fieldErrors and display the associated error
//            // message in the validationErrors div
//            $.each(data.responseJSON.fieldErrors, function (index, validationError) {
//                var errorDiv = $('#validationErrors');
//                errorDiv.append(validationError.message).append($('<br>'));
//            });
        });
    });

    $('#clear-button').click(function (event) {
        clearTinyMCEWithTitle();
    });
    
    // edit button on edit modal was clicked
    $('#edit-modal-button').click(function (event) {
        event.preventDefault();

        $.ajax({
            type: 'PUT',
            url: 'post/' + $('#edit-post-id').val(),
            data: JSON.stringify({
                postId: $('#edit-post-id').val(),
                author: $('#edit-author').val(),
                title: $('#edit-title').val(),
                text: tinyMCE.get('edit-text-area').getContent(),
                categories: $('#category-type').val(),
                tags: $('#edit-tags').val()
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'dataType': 'json'
        }).success(function () {
            clearTinyMCEWithTitle();
            $('#edit-tags').importTags('');
            clearPostTable();
            loadPendingPosts();
        });
    });
    
     // edit button on static page edit modal was clicked
    $('#edit-static-page-modal-button').click(function (event) {
        event.preventDefault();

        $.ajax({
            type: 'PUT',
            url: 'page/' + $('#edit-page-id').val(),
            data: JSON.stringify({
                pageId: $('#edit-page-id').val(),
                title: $('#edit-static-page-title').val(),
                content: tinyMCE.get('edit-static-page-text-area').getContent()
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'dataType': 'json'
        }).success(function () {
            $('#edit-static-page-title').val('');
            tinyMCE.get('edit-static-page-text-area').setContent('');
            loadStaticPages();
        });
    });
    
    // delete static page button was clicked
    $(document).on('click', '#remove-static-page', (function (event) {
       var id = $(this).attr('data-page-id');
       deletePage(id);
    }));
    
    
    // approve button on post was clicked
    $(document).on('click', 'button[id*="approve"]', (function (event) {
        var buttonId = $(this).attr('id');
        var postId = buttonId.replace("approve", ""); // get id from buttonId
        var answer = confirm("Do you really want to approve this post?");
        if (answer === true) {
            $.ajax({
                type: 'PUT',
                url: 'approve-post/' + postId
            }).success(function () {
                clearPostTable();
                loadPendingPosts();
            });
        }
    }));
      
    // edit button on post was clicked
    $(document).on('click', 'button[id*="edit"]', (function (event) {
        var buttonId = $(this).attr('id');
        var postId = buttonId.replace("edit", ""); // get id from buttonId
        tinyMCE.init({
            selector: '#edit-text-area',
            theme: 'modern',
            plugins: [
                'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen',
                'insertdatetime media nonbreaking save table contextmenu directionality',
                'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc'
            ],
            toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            toolbar2: 'print preview media | forecolor backcolor emoticons | codesample',
            image_advtab: true,
            templates: [
                {title: 'Test template 1', content: 'Test 1'},
                {title: 'Test template 2', content: 'Test 2'}
            ],
            content_css: [
                '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                '//www.tinymce.com/css/codepen.min.css'
            ]
        });
        
        var modal = $("#edit-modal");
        $('#edit-tags').tagsInput();
        
        $.ajax({
            type: 'GET',
            url: 'post/' + postId
        }).success(function (post) {
            
            modal.find('#edit-author').val(post.author);
            modal.find('#edit-title').val(post.title);
            tinyMCE.get('edit-text-area').setContent(post.content);
            //modal.find('#edit-categories').val(post.categories);
            $('#edit-tags').importTags(post.tags.toString());
    //        modal.find('#edit-comments').val(post.comments);
            modal.find('#edit-post-id').val(post.postId);
        });
    }));
  
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
                loadPendingPosts();
            });
        }
    }));

    var categoryClick = "";

    $(document).on('click', 'button[id*="cat"]', (function (event) {
        event.preventDefault();
        categoryClick = "";
        var buttonCat = $(this).attr('id');
        var newCat = $('#new-cat').val();
        var category = "";
       // loadCategories();
        if (newCat) {  // new category is being created
            createNewCategory(newCat);
            category = newCat;
        } else {
            category = buttonCat.replace("cat", ""); // get id from buttonId
        }
        
        categoryClick = category;
        changeCategory(category);
        $('#new-cat').val('');
 //      
    }));
    
//    $(document).on('click', 'button[id*="cat"]', (function (event) {
//        event.preventDefault();
//        categoryClick = "";
//        var buttonCat = $(this).attr('id');
//        var newCat = $('#new-cat-modal').val();
//        var category = "";
//       // loadCategories();
//        if (newCat) {  // new category is being created
//            createNewCategory(newCat);
//            category = newCat;
//        } else {
//            category = buttonCat.replace("cat", ""); // get id from buttonId
//        }
//        
//        
//        categoryClick = category;
//        changeCategoryModal(category);
//        $('#new-cat-modal').val('');
// //      
//    }));
    
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
    });
}

function loadPendingPosts() {
    $.ajax({
        url: "pending"
    }).success(function (posts, status) {
        createPostDivs(posts, status);
        fillPostsDiv(posts);
       // createCategoryLi(posts);
       // fillCategoryLi(posts);
    });
}

function changeCategory(category){
    $( "button#new-name" )
            .html(function(){
                return category;
        });
}

function changeCategoryModal(category){
    $( "button#edit-kategories" )
            .html(function(){
                return category;
        });
}

function loadCategories(){
    $.ajax({
        url: "categories"
    }).success(function (categories, status) {
       createCategoryLi(categories);
       fillCategoriesList(categories);
//       createCategoryLiModal(categories);
//       fillCategoriesListModal(categories);
    });
}

function loadStaticPages() {
    $.ajax({
        url: "pages"
    }).success(function (pages, status) {
        console.log("pages is: " + pages);
        // function to fill the static pages div here
        fillStaticPageDiv(pages);
    });
}




function fillStaticPageDiv(pages, status) {
   

    clearStaticPagesTable();
    // Grab the tbody element that will hold the new list of dvds
    var dTable = $('#static-pages-rows');
    // Iterate through each of the JSON objects in the test dvd data
    // and render to the summary table

    $.each(pages, function (index, page) {
        dTable.append($('<tr>') // closed </tr> automatically gets added in by jQuery
                .append($('<td>')
                        .append($('<a>')
                                .attr("href", function() {
                                     return 'staticpage/' + page.pageId;
                                })
                                .text(page.title)
                                )
                        )
                .append($('<td>')
                        .append($('<button>')
                                .attr({
                                    'type': 'button',
                                    'data-page-id': page.pageId,
                                    'data-toggle': 'modal',
                                    'data-target': '#edit-static-page-modal',
                                    'class': 'btn btn-default btn-sm edit'
                                })
                                .text('Edit')
                                ) // ends the <a> tag
                        ) // ends the <td> tag for Edit
                .append($('<td>')
                        .append($('<button>')
                                .attr({
                                  //  'onClick': 'deletePage(' + page.pageId + ')'
                                    'type': 'button',
                                    'id': 'remove-static-page',
                                    'data-page-id': page.pageId,
                                    'class': 'btn btn-danger btn-sm delete'
                                })
                                .text('Delete')
                                ) // ends the <a> tag 
                        )
                );
    });
}


// Clear all content rows from the summary table
function clearStaticPagesTable() {
    $('#static-pages-rows').empty();
}

function deletePage(pageId) {
    var answer = confirm("Do you really want to delete this page?");
    if (answer === true) {
        $.ajax({
            type: 'DELETE',
            url: 'page/' + pageId
        }).success(function () {
            loadStaticPages();
        });
    }
}

$('#edit-static-page-modal').on('show.bs.modal', function (event) {
    var element = $(event.relatedTarget);
    // Grab the dvd id
    var pageId = element.data('page-id');
    var modal = $(this);

    $.ajax({
        type: 'GET',
        url: 'page/' + pageId
    }).success(function (page) {
        modal.find('#page-id').text(page.pageId);
        modal.find('#edit-static-page-title').val(page.title);
        tinyMCE.get('edit-static-page-text-area').setContent(page.content);
        modal.find('#edit-page-id').val(page.pageId);
    });
});

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

function createNewCategory(cat) {
    $.ajax({
        type: 'POST',
        url: 'category',
        data: {'category': cat},
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
            'dataType': 'json'
    }).success(function (data, status) {
        $('#new-cat').val('');
    });
}

var categories = new Array("All");
function createCategoryLi(categories) {
//    clearPostTable();
    // Grab the tbody element that will hold the new list of posts
    var ul = $('#category-ul');
    
    $.each(categories, function (index, category) {
        //fill categories by going through each category from db
            if (category.indexOf("+") == -1)
            {
            var catId = "categories" + index;
            ul.append($('<li>')
                .attr({
                    id: catId
            }));
            }
    });
   
}
    
function fillCategoriesList(categories) {
    
    var cats = categories;
    
    // TODO: want to fill the categories list here from the
    // array of categories being passed in
    // 
    for(var i = 0; i < categories.length; i++)
    {
        var cat = categories[i];
        if (cat.indexOf("+") == -1)
            {
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
}   
//
var categories = new Array("All");
function createCategoryLi(categories) {
//    clearPostTable();
    // Grab the tbody element that will hold the new list of posts
    var ul = $('#category-ul');
    
    $.each(categories, function (index, category) {
        //fill categories by going through each category from db
            if (category.indexOf("+") == -1)
            {
            var catId = "categories" + index;
            ul.append($('<li>')
                .attr({
                    id: catId
            }));
            }
    });
   
}
    
function fillCategoriesList(categories) {
    
    var cats = categories;
    
    // TODO: want to fill the categories list here from the
    // array of categories being passed in
    // 
    for(var i = 0; i < categories.length; i++)
    {
        var cat = categories[i];
        if (cat.indexOf("+") == -1)
            {
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
} 
// 
//function createCategoryLiModal(categories) {
////    clearPostTable();
//    // Grab the tbody element that will hold the new list of posts
//    var ul = $('#kategory-ul');
//    
//    $.each(categories, function (index, category) {
//        //fill categories by going through each category from db
//            if (category.indexOf("+") == -1)
//            {
//            var catId = "kategories" + index;
//            ul.append($('<li>')
//                .attr({
//                    id: catId
//            }));
//            }
//    });
//   
//}
//    
//function fillCategoriesListModal(categories) {
//    
//    var kats = categories;
//    
//    // TODO: want to fill the categories list here from the
//    // array of categories being passed in
//    // 
//    for(var i = 0; i < categories.length; i++)
//    {
//        var kat = categories[i];
//        if (kat.indexOf("+") == -1)
//            {
//        var katId = "kat" + kat
//        var NewLiModal = React.createClass({
//            render: function() {
//            return (
//                <button className="catButt" id={katId}>{kat}</button>
//                    )
//            }
//        });
//    
//        var kategory = "kategories" + i;
//            ReactDOM.render(
//                <NewLiModal/>, 
//                document.getElementById(kategory)
//                            );
//            }              
//    }
//} 
  
 
function clearPostTable() {
    $('#content-divs').empty();
}

function createPostDivs(posts, status) {
    clearPostTable();
    // Grab the tbody element that will hold the new list of posts
    var cTable = $('#content-divs');
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
                        <div className = "author">
                            <p>{author}</p>
                        </div>
                    </div>
                    <p className = "postTitle" >{title}</p>
                    <div className="content" dangerouslySetInnerHTML={{__html: content}}></div>
                    <h5 className="tagsHeader">HashTags</h5>
                    <div className="tags" id="pub-tags">{tags}</div>
                    <h5 className="tagsHeader">Categories</h5>
                    <div className="categories" id="pub-categories">{categories}</div>
                <button type="button" id = {approveId} className ="btn btn-primary btn-sm approve">
                Approve
                </button>
                <button type="button" id = {editId} className ="btn btn-default btn-sm edit" data-toggle ="modal" data-target ="#edit-modal">
                Edit
                </button>
                <button type="button" id = {deleteId} className ="btn btn-danger btn-sm delete">
                Delete
                </button>
                
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
    var cTable = $('#content-divs');
    // Iterate through each of the JSON objects in the test post data
    // and render to the summary table
    
    //creates divs for each pending post for use by reactJS
    $.each(posts, function (index, post) {
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
                        <div className = "author">
                            <p>{author}</p>
                        </div>
                    </div>
                    <p className = "postTitle" >{title}</p>
                    <div className="content" dangerouslySetInnerHTML={{__html: content}}></div>
                    
                <button type="button" id = {approveId} className ="btn btn-primary btn-sm approve">
                Approve
                </button>
                <button type="button" id = {editId} className ="btn btn-default btn-sm edit" data-toggle ="modal" data-target ="#edit-modal">
                Edit
                </button>
                <button type="button" id = {deleteId} className ="btn btn-danger btn-sm delete">
                Delete
                </button>
                
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


