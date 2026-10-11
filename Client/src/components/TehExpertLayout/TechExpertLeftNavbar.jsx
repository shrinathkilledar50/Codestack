import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Outlet, NavLink } from 'react-router-dom';
import GuestFooter from '../guestLayout/GuestFooter';
import TechExpertHeader from './TechExpertHeader';

const TechExpertLeftNavbar = () => {
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
                <NavLink to="/admin/categories">Categories</NavLink>*/}
                <NavLink to="/techExpert/notifications">Notifications</NavLink>
                <NavLink to="/techExpert/addAnswers">Add Answers</NavLink>
                <NavLink to="/techExpert/viewAnswers">View Answers List</NavLink>
            </div>
            <div className={`content ${isCollapsed ? 'collapsed' : ''}`}>
                <div className="GuestLayout">
                    <div className="GuestHeader">
                        <TechExpertHeader />
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

export default TechExpertLeftNavbar
