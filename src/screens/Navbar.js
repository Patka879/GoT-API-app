import {NavLink} from "react-router-dom"

const generateLinkClass = ({isActive}) =>
isActive ? "nav-link-active" : "nav-Link"

export default function Navbar() {
    return(
        <nav>
            <NavLink 
                to="characters"
                className={generateLinkClass}
                >Characters 
            </NavLink>
            <NavLink 
                to="houses"
                className={generateLinkClass}
                >Houses 
            </NavLink>
        </nav>
    )
}