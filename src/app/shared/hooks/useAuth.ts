import { useContext } from 'react';

import { AuthorizationContext } from '../contexts/authorization';

export const useAuth = () => {
    const context = useContext(AuthorizationContext);

    return context
}
