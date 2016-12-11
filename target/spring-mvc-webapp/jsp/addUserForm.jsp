<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html> 
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

        <title>Users</title> 

        <!-- Admin CSS -->
        <link href="${pageContext.request.contextPath}/css/Capstone.css" rel="stylesheet" type="text/css">
        <link href="${pageContext.request.contextPath}/css/bootstrap.min.css" rel="stylesheet">

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
                        <li><button role="presentation" style="border:none; background-color: white;" class="hvr-underline-from-left active" ><a href="${pageContext.request.contextPath}/template">Static Page</a></button></li>

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
            <div class="main_container">
                <!-- Tabs -->
                <div id="wizard_verticle" class="form_wizard wizard_verticle">
                    <ul class="list-unstyled wizard_steps">


                    </ul>

                    <div>
                        <form method="POST" action="addUser" class="form-horizontal form-label-left">

                            <h1 class="text-center">Recombinex Corporation</h1><br><br>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3" for="username">Username <span class="required"> *</span>
                                </label>
                                <div class="col-md-6 col-sm-6">
                                    <input type="text" name="username" id="first-name2" required="required" class="form-control col-md-7 col-xs-12">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3" for="password">Password:&nbsp; <span class="required"> * </span>
                                </label>
                                <div class="col-md-6 col-sm-6">
                                    <input type="password" name="password" id="first-name2" required="required" class="form-control col-md-7 col-xs-12">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3" for="password">Admin User <span class="required"> * </span>
                                </label>
                                <div class="col-md-6 col-sm-6">
                                    <input type="checkbox" name="isAdmin" id="first-name2" class="form-control col-md-7 col-xs-12" value="Yes"/><br/>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3"><span>  </span>
                                </label>
                            <input type="submit" value="Add User" class="btn btn-primary"/><br/>
                            </div>
                        </form>
                    </div>

                </div>
                <!-- End SmartWizard Content -->
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