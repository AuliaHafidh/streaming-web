import { Link } from 'react-router-dom';
import './Components.css';

export default function GenreBadge({ genre }) {
    return (
        <Link to={`/genre/${genre.id}`} className="genre-badge">
            {genre.name}
        </Link>
    );
}
