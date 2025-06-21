import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles, allowedPermissions }) => {
    // const token = localStorage.getItem('token');
    // const user = JSON.parse(localStorage.getItem('user'));

    // if (!token || !user) {
    //     return <Navigate to="/login" replace />;
    // }

    // //if (allowedRoles && !allowedRoles.includes(user.rol.toLowerCase())) {
    // if (allowedRoles && allowedPermissions && (!allowedRoles.map(r => r.toLowerCase()).includes(user.rol.toLowerCase()) || !allowedPermissions.map(p => p.toLowerCase()).includes(user.permissions.toLowerCase()))) {
    //     return <Navigate to="/no-autorizado" replace />;
    // }

    // return children;

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    const userRole = user.rol?.toLowerCase();
    const userPermissions = (user.permissions || []).map(p => p.toLowerCase());

    const isRoleAllowed =
        allowedRoles?.some(role => role.toLowerCase() === userRole) ?? false;

    const isPermissionAllowed =
        allowedPermissions?.some(p => userPermissions.includes(p.toLowerCase())) ?? false;

    if (!isRoleAllowed && !isPermissionAllowed) {
        return <Navigate to="/no-autorizado" replace />;
    }

    return children;
};

export default PrivateRoute;
