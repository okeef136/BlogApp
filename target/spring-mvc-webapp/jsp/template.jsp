<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en-US">
    <head>
        <title>${page.title}</title>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible"content="IE=edge">
        <meta name="viewport"content="width=device-width, initial-scale=1">
        <title>Recombinex</title>
        <link href="${pageContext.request.contextPath}/css/Capstone.css"rel="stylesheet"type="text/css">
        <link href="${pageContext.request.contextPath}/css/bootstrap.min.css"rel="stylesheet">
        <link href="${pageContext.request.contextPath}/css/hover.css"rel="stylesheet">
        <link href="${pageContext.request.contextPath}/css/jquery.tagsinput.css"rel="stylesheet">
        <link rel="shortcut icon"href="${pageContext.request.contextPath}/img/Recombinex.png">
        <script src="http://use.edgefonts.net/source-sans-pro:n2:default.js"type="text/javascript"></script>
        <script src="${pageContext.request.contextPath}/js/tinymce.min.js"></script>
    </head>
    <body>
        <!--Main Container-->
        <div class="container">
            <!--Navigation-->
            <header>
                <sec:authorize access="isAnonymous()">
                    <div>
                        <%@include file="loginModalFragment.jsp"%>
                        <button data-toggle="modal"data-target="#login-modal"class="btn btn-primary hvr-grow-shadow login">Login</button>
                        &nbsp;
                    </div>
                </sec:authorize>
                <nav>
                    <ul style="padding-left: 0px">
                        <li><button role="presentation"style="border:none; background-color: white;"class="hvr-underline-from-left active"><a href="${pageContext.request.contextPath}/home">Home</a></button></li>
                        <sec:authorize access="hasRole('ROLE_ADMIN')">
                            <li><button role="presentation"style="border:none; background-color: white;"class="hvr-underline-from-center"><a href="${pageContext.request.contextPath}/admin">Admin</a></button></li>
                            </sec:authorize>
                            <sec:authorize access="hasRole('ROLE_ADMIN')">
                            <li><button role="presentation"style="border:none; background-color: white;"class="hvr-underline-from-center"role="presentation"><a href="${pageContext.request.contextPath}/displayUserList">User List</a></button></li>
                            </sec:authorize>
                            <sec:authorize access="hasRole('ROLE_ADMIN')">
                            <li><button role="presentation"style="border:none; background-color: white;"class="hvr-underline-from-center active"role="presentation"><a href="${pageContext.request.contextPath}/addPage">Add Page</a></button></li>
                            </sec:authorize>
                            <sec:authorize access="hasRole('ROLE_EMPLOYEE')">
                            <li><button role="presentation"style="border:none; background-color: white;"class="hvr-underline-from-center"><a href="${pageContext.request.contextPath}/employee">Employee</a></button></li>
                            </sec:authorize>

                        <!-- #1-Logout link-->
                        <sec:authorize access="hasAnyRole('ROLE_ADMIN, ROLE_EMPLOYEE')">
                            <li><button class="hvr-underline-from-right"role="presentation"style="border:none; background-color: white;">
                                    <a href="${pageContext.request.contextPath}/j_spring_security_logout">Log Out</a>
                                </button></li>
                            </sec:authorize>
                    </ul>
                </nav>
            </header>
            <hr>
            <div class="row">
                <div id="homeIconLeft"class="col-md-3">
                    <img class=".img-responsive"src="${pageContext.request.contextPath}/img/RecombinexHeaderIcon.png"/>
                </div>

                <div class="col-md-6">
                    <section class="hero"id="hero">
                        <h2 class="hero_header">Recombinex</h2>
                        <p class="tagline">Exploring and Adapting Innovation for Next Generations Synergenistic Technologies</p>
                    </section>
                </div>
                <div id="homeIconRight"class="col-md-3">
                    <img class=".img-responsive"src="${pageContext.request.contextPath}/img/RecombinexHeaderIcon.png"/>
                </div>
            </div>
            <div class="text-center">${page.content}<br><div>
                    <footer></footer>
                    <!--Footer Section-->
                    <section class="footer_banner"id="contact">
                        <h2 class="hidden">Footer Banner Section</h2>
                    </section>
                </div>
            </div>
        </div>
        <!--Copyrights Section-->
        <div class="copyright">&copy;2016-Recombinex LLC</div>
        <script src="https://fb.me/react-15.0.0.js"></script>
        <script src="https://fb.me/react-dom-15.0.0.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
        <script src="${pageContext.request.contextPath}/js/bootstrap.min.js"></script>
    </body>
</html>
