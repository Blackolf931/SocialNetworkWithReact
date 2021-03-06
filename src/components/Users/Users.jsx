import React from "react";
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";


let Users = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props}) => {
    return <div>
        {
            users.map(u =>
                <User user={u}
                      followingInProgress={props.followingInProgress}
                      key={u.id}
                      unfollow={props.unfollow}
                      follow={props.follow}
                />
            )
        }
        <Paginator currentPage={props.currentPage}
                   onPageChanged={onPageChanged}
                   totalUsersCount={totalUsersCount}
                   pageSize={pageSize}
                   portionSize = {10}/>
    </div>
}
export default Users