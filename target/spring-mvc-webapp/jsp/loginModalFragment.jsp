<!-- Modal -->
<sec:authorize access="isAnonymous()">
    <div id="login-modal" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->


            <div class="modal-content" style="text-align: center;width:60%;margin-left: 100px;background-color: #7DCF83">
                <div class="modal-header" style="background-color: whitesmoke">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>

                </div>
                <div class="modal-body" style="background-color: white">
                    <div>
                        <h2 style="margin-bottom:30px">Login</h2>
                        <!-- #1 - If login_error == 1 then there was a failed login attempt -->
                        <!-- so display an error message 
                        <c:if test="">
                            <h3>Incorrect Login or Password</h3>
                        </c:if>
                        -->
                        <!-- #2 - Post to Spring security to check our authentication -->
                        <form style="margin-left: 60px" method="post" class="signin" action="j_spring_security_check">
                            <fieldset>
                                <table cellspacing="0">
                                    <tr>
                                        <td>
                                            <div class="input-group" style="margin-bottom: 10px">
                                                <span class="input-group-addon" id="basic-addon1">User</span>
                                                <input id="username_or_email" name="j_username" type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1">
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <!-- #2b - must be j_password for Spring -->
                                        <td>

                                            <div class="input-group">
                                                <span class="input-group-addon" id="basic-addon1"><img style="padding-right:8px;padding-left:8px" src="${pageContext.request.contextPath}/img/Recombinex3.png"/></span>
                                                <input id="password"name="j_password" id="username_or_email" name="j_username" type="password" class="form-control" placeholder="Password" aria-describedby="basic-addon1">
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                                <button name="commit" type="submit" value="Sign In" class="btn btn-lg btn-secondary hvr-sweep-to-top signIn" 
                                        style="background-color: white; 
                                        border-color: #7DCF83;
                                        margin-top: 20px;
                                        margin-right: 50px;
                                        margin-bottom:30px" >Sign In</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>

        </div>
    </div>
</sec:authorize>
