import css from "./profile.module.css";

export default function Profile({ name, tag, image, location, stats }) {
  return (
    <div className={css.main}>
      <div className={css.profileInfo}>
        <img className={css.image} src={image} alt={tag} />
        <p>{name}</p>
        <p>@{tag}</p>
        <p>{location}</p>
      </div>

      <ul className={css.profileList}>
        <li className={css.profileSubLi}>
          <span>Followers</span>
          <span>{stats.followers}</span>
        </li>

        <li className={css.profileSubLi}>
          <span>Views</span>
          <span>{stats.views}</span>
        </li>

        <li className={css.profileSubLi}>
          <span>Likes</span>
          <span>{stats.likes}</span>
        </li>
      </ul>
    </div>
  );
}
