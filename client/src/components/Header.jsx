import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className=' flex justify-between px-20 py-10'>
            <h1 className=' text-2xl font-bold'>Brand</h1>
            <nav className=' flex gap-12'>
                <ul><li><Link to={"/"}>Home</Link></li></ul>
                <ul><li><Link to={"/about"}>About</Link></li></ul>
                <ul><li><Link to={"/login"}>Login</Link></li></ul>
                <ul><li><Link to={"/register"}>Register</Link></li></ul>
            </nav>
            <button className=' bg-yellow-400  px-5 py-2'>
                Enquire
            </button>
        </header>
    )
}

export default Header