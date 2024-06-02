import FriendListItem from "./FriendListItem";
import css from "./FriendListItem.module.css";
export default function FriendList({ friends }) {
  return (
    <ul className={css.friendsUl}>
      {friends.map((friend) => {
        return (
          <li className={css.friendsLi} key={friend.id}>
            <FriendListItem
              avatar={friend.avatar}
              name={friend.name}
              isOnline={friend.isOnline}
            />
          </li>
        );
      })}
    </ul>
  );
}
