<!-- Post edit modal -->
<div class="modal fade" id="edit-modal" tabindex="-1" role="dialog"
     aria-labelledby="editModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div style="background-color:whitesmoke" class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span>
                    <span class="sr-only">Close</span></button>

            </div>
            <div class="modal-body" style="margin-left:auto;margin-right:auto;">
                <h3 id="edit-id"></h3>
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label style="text-align: center" for="edit-author" class="col-md-2 control-label">
                            Author
                        </label>
                        <div class="col-md-10">
                            <input type="text" class="form-control" id="edit-author"
                                   placeholder="Author">
                        </div>
                    </div>
                    <div class="form-group">
                        <label style="text-align: center" for="edit-title" class="col-md-2 control-label">
                            Title
                        </label>
                        <div class="col-md-10">
                            <input type="text" class="form-control" id="edit-title"
                                   placeholder="Title">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-md-12">
                            <textarea id="edit-text-area"></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-md-12">
                            <input type="text" style="margin-top: 5px;" class="form-control" id = "edit-tags"/>
                        </div>
                    </div>
                    <!--<div class="form-group">
                    <div class="dropdown" style="margin-left: 2%">

                            <button 
                                id = "edit-kategories"
                                style="
                                background-color:#7DCF83 !important;
                                border-color: #7DCF83 !important;
                                display:inline; 
                                width:200px;
                                " class="btn btn-primary dropdown-toggle hvr-icon-down" type="button" data-toggle="dropdown">Categories
                            </button>
                            <ul id="kategory-ul" style="width:200px" class="dropdown-menu">
                                <li>
                                    <input type="text" style='margin:auto;display:float;width:80%' class="form-control" id = "new-cat-modal" placeholder="New Category"/>
                                </li>
                                <li><hr style='margin:10px 0'>
                                </li>
                            </ul>
                        </div>
                    </div>-->
                    <div class="form-group">
                        <div class="" style="float:right;margin-right:2%">
                            <button type="submit" id="edit-modal-button" class="btn btn-primary"
                                    data-dismiss="modal">
                                Edit Post
                            </button>
                            <button type="button" class="btn btn-default"
                                    data-dismiss="modal">
                                Cancel
                            </button>
                            <input type="hidden" id="edit-post-id">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Static page edit modal -->
<div class="modal fade" id="edit-static-page-modal" tabindex="-1" role="dialog"
     aria-labelledby="editStaticPageLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div style="background-color:whitesmoke" class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span>
                    <span class="sr-only">Close</span></button>

            </div>
            <div class="form-group" style="margin-top:8px">
                <label style="text-align: center;margin-top:5px" for="edit-static-page-title" class="col-md-2 control-label">
                    Title
                </label>
                <div class="col-md-10">
                    <input type="text" class="form-control" id="edit-static-page-title"
                           placeholder="Title">
                </div>
            </div>
            <div class="modal-body" style="margin-left:auto;margin-right:auto;">
                <h3 id="edit-id"></h3>
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <div class="col-md-12">
                            <textarea id="edit-static-page-text-area"></textarea>
                        </div>
                    </div>
                    <div class="form-group">

                    </div>
                    <div class="form-group">
                        <div class="" style="float:right;margin-right:2%">
                            <button type="submit" id="edit-static-page-modal-button" class="btn btn-primary"
                                    data-dismiss="modal">
                                Edit Page
                            </button>
                            <button type="button" class="btn btn-default"
                                    data-dismiss="modal">
                                Cancel
                            </button>
                            <input type="hidden" id="edit-page-id">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>