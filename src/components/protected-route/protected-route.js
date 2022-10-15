import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { getCookie } from '../../utils/utils';

export function ProtectedRoute({ children, ...rest }) {
    const { refreshTokenRequest } = useSelector(store => store.user);
    const token = getCookie('refreshToken');

    if (token && refreshTokenRequest) {
        return (
            <>
                <p className='text text text_type_main-large'>Идет загрузка...</p>
            </>
        )
    }

    return (
    <Route
        {...rest}
        render={({ location }) =>
        token ? (
                children
            ) : (
                <Redirect to={{ pathname: '/login', state: { from: location } }} />
            )
        }
    />
  );
}