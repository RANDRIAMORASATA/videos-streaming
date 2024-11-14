import React, { FC, useEffect, useState } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';

const Header: FC = () => {
  const currentSearchParams = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const searchQuery = currentSearchParams.get('searchVideo') || '';
  const [searchInput, setSearchInput] = useState<string>(searchQuery);

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const currentSearchParams = new URLSearchParams(window.location.search);
    currentSearchParams.set('searchVideo', searchInput);  // Fix typo in query param name
    navigate({ search: currentSearchParams.toString() });
  };

  return (
    <div className="Header">
      <nav className="navbar navbar-light bg-light justify-content-between shadow-lg">
        <ul className="flex navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link to="/" className="navbar-brand">Vidéos en streaming</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/account">Account</Link>
          </li>
        </ul>
        <form className="form-inline" onSubmit={handleSearchSubmit}>
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchInput}
            onChange={(event) => setSearchInput((event.target as HTMLInputElement).value)}
          />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </nav>
    </div>
  );
};

export default Header;
