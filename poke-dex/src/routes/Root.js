import "../index.css"
import { Link, Outlet } from "react-router-dom"
import React, { useEffect } from 'react';

export default function App() {
    useEffect(() => { document.body.style.backgroundColor = '#000000' }, [])
    return (
        <>
            <nav>
                <Link to="/">
                    <button>Home</button>
                </Link>
                <Link to="/about">
                    <button>About</button>
                </Link>
            </nav>
            <Outlet />
        </>
    )
}