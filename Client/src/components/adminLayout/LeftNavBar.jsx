import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import AdminHeader from './AdminHeader';
import { Outlet, NavLink } from 'react-router-dom';
import GuestFooter from '../guestLayout/GuestFooter';

const LeftNavBar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div>
            <button className="toggle-btn" onClick={toggleSidebar}>
                {isCollapsed ? '☰' : '✖'}
            </button>
            <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                {/* <NavLink to="/admin/dashboard">Dashboard</NavLink>
                <NavLink to="/admin/categories">Categories</NavLink> */}
                <NavLink to="/admin/notifications">Set Notifications</NavLink>
                <NavLink to="/admin/techExperts">Tech Experts List</NavLink>
                <NavLink to="/admin/technologies">Add Technologies</NavLink>
                <NavLink to="/admin/errorTypes">Add Error Types</NavLink>

            </div>
            <div className={`content ${isCollapsed ? 'collapsed' : ''}`}>
                <div className="GuestLayout">
                    <div className="GuestHeader">
                        <AdminHeader />
                    </div>
                    <div className="Outlet">
                        <Outlet />
                    </div>
                    <div className="GuestFooter">
                        <GuestFooter />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeftNavBar;
