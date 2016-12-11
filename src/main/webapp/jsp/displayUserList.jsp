<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Users</title>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Recombinex</title>
        <link href="${pageContext.request.contextPath}/css/Capstone.css" rel="stylesheet" type="text/css">
        <link href="${pageContext.request.contextPath}/css/bootstrap.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/css/hover.css" rel="stylesheet">
        <link rel="shortcut icon" href="${pageContext.request.contextPath}/img/Recombinex.png">
        <script src="http://use.edgefonts.net/source-sans-pro:n2:default.js" type="text/javascript"></script>
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
            <section class="hero" id="hero">
                <h2 class="hero_header">Recombinex</h2>
                <p class="tagline">Exploring and Adapting Innovation for Next Generations Synergenistic Technologies</p>
            </section>
            <div class="row">
                <div class="col-md-6" style="max-width: 720px !important">
                    <h2>Users</h2>
                    <a href="displayUserForm">Add a User</a><br/>
                    <hr/>
                    <c:forEach var="user" items="${users}">

                        <c:out value="${user.username}"/> 
                        <c:if test="${user.isSuper == 1}"><a href="deleteUser?username=${user.username}"></a><br/><br/></c:if>
                        <c:if test="${user.isSuper == 0}"><a href="deleteUser?username=${user.username}">| Delete</a><br/><br/></c:if>
                    </c:forEach>
                </div>
                <div class="col-md-6">

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
        <script src="${pageContext.request.contextPath}/js/jquery-2.2.4.min.js"></script>
        <script type="text/babel" src="${pageContext.request.contextPath}/js/blog.js"></script>
        <script src="${pageContext.request.contextPath}/js/bootstrap.min.js"></script>
    </body>

</html>
