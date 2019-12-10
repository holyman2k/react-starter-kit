import React from "react"
import { Link } from "react-router-dom"

const Nav = ({ }) => {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <a class="navbar-brand" href="#">React</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbar">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item"><Link class="nav-link" to="/">Home</Link></li>
                        <li class="nav-item"><Link class="nav-link" to="animation">Animation</Link></li>
                        <li class="nav-item"><Link class="nav-link" to="popups">Popups</Link></li>
                        <li class="nav-item"><Link class="nav-link" to="todo">Todo</Link></li>
                    </ul>
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbar-dropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Welcome! </a>
                            <div class="dropdown-menu" aria-labelledby="navbar-dropdown">
                                <a class="dropdown-item" href="#">Logout</a>
                            </div>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    );
};

export default Nav;


