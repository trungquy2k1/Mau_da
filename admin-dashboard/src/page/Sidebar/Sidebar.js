import { NavLink } from 'react-router-dom';

import config from '../../configRoute';
import Button from '../../component/Button/Button';
import './Sidebar.css';
import { useState } from 'react';
const Siderbar = () => {
    const handleCLick = () => {
        // alert('okok');
    };
    return (
        <div className="containerSidbar">
            <NavLink to={config.routes.tongquan} style={{ textDecoration: 'none' }}>
                <Button title="Tổng quan" onClick={handleCLick} />
            </NavLink>

            <NavLink to={config.routes.user} style={{ textDecoration: 'none' }}>
                <Button title="Người dùng" onClick={handleCLick} />
            </NavLink>

            <NavLink to={config.routes.category} style={{ textDecoration: 'none' }}>
                <Button title="Loại sản phẩm" onClick={handleCLick} />
            </NavLink>

            <NavLink to={config.routes.product} style={{ textDecoration: 'none' }}>
                <Button title="Sản phẩm" onClick={handleCLick} />
            </NavLink>

            <NavLink to={config.routes.cart} style={{ textDecoration: 'none' }}>
                <Button title="Giỏ hàng" onClick={handleCLick} />
            </NavLink>
            <NavLink to={config.routes.order} style={{ textDecoration: 'none' }}>
                <Button title="Đặt hàng" onClick={handleCLick} />
            </NavLink>
        </div>
    );
};

export default Siderbar;
