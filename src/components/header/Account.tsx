import React from "react";
import { NavLink } from "react-router-dom";

const Account: React.FC = () => {
    return (
        <div className="header-account">
            <NavLink to="" className="account-info">
                <div className="account-avatar">
                    <img src="/src/assets/notifications.svg" alt="Notifications" className="notifications-image"/>
                </div>
            </NavLink>
            <NavLink to="" className="account-dropdown" aria-label="Account menu">
                <img src="/src/assets/avatar.svg" alt="Avatar" className="avatar-image"/>
            </NavLink>
        </div>
    );
};

export default Account;