import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSun, FiMoon, FiMenu, FiX, FiSearch, FiFilm, FiLogOut } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
    const { isDark, toggleTheme } = useTheme();
    const { user, signOut } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
            setMenuOpen(false);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut();
            setMenuOpen(false);
            navigate('/');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const getInitials = (email) => {
        if (!email) return '?';
        return email.charAt(0).toUpperCase();
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <FiFilm className="logo-icon" />
                    <span>Moviora</span>
                </Link>

                <form className="navbar-search" onSubmit={handleSearch}>
                    <FiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search movies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>

                <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
                    <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="/watchlist" onClick={() => setMenuOpen(false)}>Watchlist</Link>
                    <Link to="/history" onClick={() => setMenuOpen(false)}>History</Link>

                    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                        {isDark ? <FiSun /> : <FiMoon />}
                    </button>

                    {user ? (
                        <div className="profile-menu">
                            <button
                                className="profile-btn"
                                aria-label="User Profile"
                            >
                                <div className="profile-avatar">
                                    {getInitials(user.email)}
                                </div>
                            </button>
                            <div className="profile-dropdown">
                                <div className="dropdown-header">
                                    <span className="dropdown-email">{user.email}</span>
                                </div>
                                <button onClick={handleLogout} className="dropdown-item logout">
                                    <FiLogOut />
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="login-link" onClick={() => setMenuOpen(false)}>Login</Link>
                    )}
                </div>

                <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                    {menuOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>
        </nav>
    );
}
