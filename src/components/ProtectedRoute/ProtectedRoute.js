import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ element: Component, ...props }) => {
  return (
    props.loggedIn === 'loggedIn'
      ? <Component {...props} />
      : props.loggedIn === 'loggedOut'
        ? <Navigate to="/" replace />
        : <div>Загрузка...</div>
  )
};
