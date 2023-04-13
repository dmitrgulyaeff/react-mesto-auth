import { Navigate } from 'react-router-dom';

const ProtectedRouteElement = ({ children, IsAllowed, path }) => {
  return IsAllowed ?  children  : <Navigate to={path} replace />;
};

export default ProtectedRouteElement;
