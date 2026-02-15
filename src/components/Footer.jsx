import { FiFilm, FiGithub, FiHeart } from 'react-icons/fi';
import './Components.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <FiFilm className="footer-logo" />
                    <span>CineVault</span>
                </div>
                <p className="footer-text">
                    Powered by <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">TMDB</a>.
                    Built with <FiHeart className="heart-icon" /> using React.
                </p>
                <p className="footer-copy">&copy; {new Date().getFullYear()} CineVault. All rights reserved.</p>
            </div>
        </footer>
    );
}
