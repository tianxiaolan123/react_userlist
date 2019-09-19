import React, { Component } from 'react'
import {Redirect,Route,BrowserRouter,Switch} from "react-router-dom"
import User from "../view/user/user"
import Detail from "../view/detail/detail"

function RootRouter(){
    return <BrowserRouter>
     <Switch>
          <Route path="/user" component={User}></Route>
          <Route path="/detail" component={Detail}></Route>
          {/* <Redirect from="/" to="/user"/> */}
     </Switch>
    </BrowserRouter>
}
export default RootRouter;