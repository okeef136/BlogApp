/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global React */
$(document).ready(function () {
    $('#pub-tags').tagsInput();
    $('#author').hide();
    loadCategories();
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
    
});

//==========
// VARIABLES
//==========

//==========
// FUNCTIONS
//==========
function changeCategory(category){
    $( "button#new-name" )
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

