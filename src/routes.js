import React from 'react'
import {Switch , Route} from 'react-router-dom'

// Paginas
import CriarConta from './pages/CriarConta';
import Login from './pages/Login';
import Home from './pages/Home';
import Perfil from './pages/Perfil';
import Post from './pages/Post';
import Posts from './pages/Posts';
import NotFound from './pages/NotFound';

function Routes() {
    return (
        <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/criar-conta" component={CriarConta}/>
            <Route path="/login" component={Login}/>
            <Route path="/perfil" component={Perfil}/>
            <Route path="/posts/todos" exact component={Posts}/>
            <Route path="/post/:id" component={Post}/>
            <Route path="*" component={NotFound}/>
        </Switch>
    )
}

export default Routes
