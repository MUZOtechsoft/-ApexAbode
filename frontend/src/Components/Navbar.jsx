import React from 'react'
import { MdAddHome, MdHomeWork, MdPermContactCalendar } from 'react-icons/md'
import { RiCheckboxMultipleBlankFill } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'

const Navbar = ({containerStyle = ""}) => {
    console.log(containerStyle);
    return (
        <nav className={`${containerStyle}`}>
            <NavLink to={"/"} className={({ isActive }) => isActive ? "active-link flexCenter gap-x-1 rounded-full px-2 py-1" :
                "flexCenter gap-x-1 rounded-full px-2 py-1"}>
                <MdHomeWork />
                <div>Home</div>
            </NavLink>
            <NavLink to={"/listing"} className={({ isActive }) => isActive ? "active-link flexCenter gap-x-1 rounded-full px-2 py-1" :
                "flexCenter gap-x-1 rounded-full px-2 py-1"}>
                <RiCheckboxMultipleBlankFill />
                <div>Listing</div>
            </NavLink>
            <NavLink to={"/AddProperty"} className={"flexCenter gap-x-1 rounded-full px-2 py-1"}>
                <MdAddHome />
                <div>Addproperty</div>
            </NavLink>
            <NavLink to={"/contact"} className={"flexCenter gap-x-1 rounded-full px-2 py-1"}>
                <MdPermContactCalendar />
                <div>Contact</div>
            </NavLink>
        </nav>
    )
}

export default Navbar