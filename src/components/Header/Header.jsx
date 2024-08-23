import { NavLink } from "react-router-dom";
import css from "./header.module.css";

export default function Header() {
  return (
    <header className={css.header}>
      <div className="container">
        <nav className={css.nav}>
          <NavLink
            className={({ isActive }) =>
              isActive ? css.navActive : css.navLink
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? css.navActive : css.navLink
            }
            to="/movies"
          >
            Movies
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
