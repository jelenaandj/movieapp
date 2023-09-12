import './footer.scss'
import { NavLink } from 'react-router-dom'


const Footer = () => {
    return (
        <div className='container'>
            <footer className='footer'>
                <nav className='footer__nav'>
                    <ul className='footer__nav-list'>
                        <li className='footer__list-item first'>MOVIES © 2023</li>
                        <li className='footer__list-item'><NavLink className='header__list-link' to="/" style={({ isActive }) => {
                            return isActive ? { color: "#5A4AF4" } : {}
                        }}>All Movies</NavLink></li>
                        {/* {localStorage.getItem('allUserData') && */}
                        {/* <> */}
                        <li className='footer__list-item'>/</li>
                        <li className='footer__list-item'><NavLink className='header__list-link' to="/favorites" style={({ isActive }) => {
                            return isActive ? { color: "#5A4AF4" } : {}
                        }}>Favorites</NavLink></li>
                        <li className='footer__list-item'>/</li>
                        <li className='footer__list-item'><NavLink className='header__list-link' to="/add" style={({ isActive }) => {
                            return isActive ? { color: "#5A4AF4" } : {}
                        }}>Add new movie</NavLink></li>
                        {/* </> */}
                        {/* } */}
                    </ul>
                </nav>
            </footer>
        </div>
    )
}

 

export default Footer