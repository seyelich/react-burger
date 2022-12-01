import { useSelector } from '../../services/hooks';
import { Route, Redirect } from 'react-router-dom';
import { getCookie } from '../../utils/utils';
import { FC, ReactNode } from 'react';

export const ProtectedRoute: FC<{path: string, exact?: boolean, children: ReactNode}> = ({ children, ...rest }) => {
    const { refreshTokenRequest } = useSelector(store => store.user);
    const token = getCookie('accessToken');

    if (token && refreshTokenRequest) {
        return (
            <p className='text text text_type_main-large'>Загрузка...</p>
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