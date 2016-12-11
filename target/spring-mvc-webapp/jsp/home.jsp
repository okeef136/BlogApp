<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html lang="en-US">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Recombinex</title>
        <link href="${pageContext.request.contextPath}/css/Capstone.css" rel="stylesheet" type="text/css">
        <link href="${pageContext.request.contextPath}/css/bootstrap.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/css/hover.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/css/jquery.tagsinput.css" rel="stylesheet">
        <link rel="shortcut icon" href="${pageContext.request.contextPath}/img/Recombinex.png">
        <script src="http://use.edgefonts.net/source-sans-pro:n2:default.js" type="text/javascript"></script>
        <script src='//cdn.tinymce.com/4/tinymce.min.js'></script>
        <!--The following script tag downloads a font from the Adobe Edge Web Fonts server for use within the web page. We recommend that you do not modify it.-->



    </head>
    <body>
        <!-- Main Container -->
        <div class="container"> 
            <!-- Navigation -->
            <header>
                <sec:authorize access="isAnonymous()">
                <div>
                    <%@include file="loginModalFragment.jsp" %>
                    <button data-toggle="modal" data-target="#login-modal" class="btn btn-primary hvr-grow-shadow login">Login</button>
                    &nbsp;
                </div>
                </sec:authorize>
                <nav>
                    <ul style="padding-left: 0px">
                        <li><button role="presentation" style="border:none; background-color: white;" class="hvr-underline-from-left active" ><a href="${pageContext.request.contextPath}/home">Home</a></button></li>
                        <sec:authorize access="hasRole('ROLE_ADMIN')">
                            <li><button role="presentation" style="border:none; background-color: white;" class="hvr-underline-from-center"><a href="${pageContext.request.contextPath}/admin">Admin</a></button></li>
                        </sec:authorize>
                        <sec:authorize access="hasRole('ROLE_ADMIN')">
                            <li><button role="presentation" style="border:none; background-color: white;" class="hvr-underline-from-center"  role="presentation" ><a href="${pageContext.request.contextPath}/displayUserList">User List</a></button></li>
                        </sec:authorize>
                        <sec:authorize access="hasRole('ROLE_ADMIN')">
                            <li><button role="presentation" style="border:none; background-color: white;" class="hvr-underline-from-center active"  role="presentation" ><a href="${pageContext.request.contextPath}/addPage">Add Page</a></button></li>
                        </sec:authorize>
                        <sec:authorize access="hasRole('ROLE_EMPLOYEE')">
                            <li><button role="presentation" style="border:none; background-color: white;" class="hvr-underline-from-center"><a href="${pageContext.request.contextPath}/employee">Employee</a></button></li>
                        </sec:authorize>

                        <!-- #1 - Logout link -->
                        <sec:authorize access="hasAnyRole('ROLE_ADMIN, ROLE_EMPLOYEE')">
                            <li><button class="hvr-underline-from-right" role="presentation" style="border:none; background-color: white;">
                                    <a href="${pageContext.request.contextPath}/j_spring_security_logout">Log Out</a>
                                </button></li>
                        </sec:authorize>
                    </ul>
                </nav>
            </header>
            <!-- Hero Section -->
            <hr>
            <div class="row">
                <div id="homeIconLeft" class="col-md-3">
                    <img class=".img-responsive" src="${pageContext.request.contextPath}/img/RecombinexHeaderIcon.png"/>
                </div>

                <div class="col-md-6">
                    <section class="hero" id="hero">
                        <h2 class="hero_header">Recombinex</h2>
                        <p class="tagline">Exploring and Adapting Innovation for Next Generations Synergenistic Technologies</p>
                    </section>
                </div>
                <div id="homeIconRight" class="col-md-3">
                    <img class=".img-responsive" src="${pageContext.request.contextPath}/img/RecombinexHeaderIcon.png"/>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-md-5" style="max-width: 720px !important">
                    <h1 style="text-align: center">Search Post</h1>
                    <div class="col-md-12 container searchPost">
                        <div class="dropdown">
                            <button style="
                                    background-color:#7DCF83 !important;
                                    border-color: #7DCF83 !important;
                                    display:inline;
                                    margin-top:15px; 
                                    width:200px;
                                    margin-left: auto;
                                    margin-right: auto;" class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Categories
                                <span class="caret"></span></button>
                            <h4 id = "category-name" style="margin-top: 25px;margin-right: 15%;display:inline;float:right">All</h4>
                            <ul id="category-ul" style="width:200px" class="dropdown-menu">
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-12 container searchPost">
                        <div class="dropdown">
                            <button style="
                                    background-color:#7DCF83 !important;
                                    border-color: #7DCF83 !important;
                                    display:inline;
                                    margin-top:15px; 
                                    width:200px;
                                    margin-left: auto;
                                    margin-right: auto;" class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Tags
                                <span class="caret"></span></button>
                            <h4 id = "tag-name" style="margin-top: 25px;margin-right: 15%;display:inline;float:right">All</h4>
                            <ul id="tag-ul" style="width:200px" class="dropdown-menu">
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-md-7">
                    <h2 class="cat-select" style="text-align: center">All</h2>
                    <table id="postTable" class="table">
                        <tbody id="content-divs-home"></tbody>
                    </table>
                </div>
            </div>


            <footer> </footer>
            <!-- Footer Section -->
            <section class="footer_banner" id="contact">
                <h2 class="hidden">Footer Banner Section </h2>
            </section>
            <!-- Copyrights Section -->
            <div class="copyright">&copy;2016 - Recombinex LLC</div>
        </div>
        <!-- Main Container Ends -->
        <script src="${pageContext.request.contextPath}/js/jquery-2.2.4.min.js"></script>
        <script src="${pageContext.request.contextPath}/js/jquery.tagsinput.js"></script>
        <sec:authorize access="hasRole('ROLE_ADMIN')">
             <script type="text/babel" src="${pageContext.request.contextPath}/js/blogDelete.js"></script>              
        </sec:authorize>
        <sec:authorize access="hasAnyRole('ROLE_ANONYMOUS, ROLE_USER, ROLE_EMPLOYEE')">
            <script type="text/babel" src="${pageContext.request.contextPath}/js/blog.js"></script>
        </sec:authorize>
        <script src="https://fb.me/react-15.0.0.js"></script>
        <script src="https://fb.me/react-dom-15.0.0.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
        <script src="${pageContext.request.contextPath}/js/bootstrap.min.js"></script>
    </body>
</html>
