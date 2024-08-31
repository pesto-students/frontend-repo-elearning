import { useLocalStorage } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [accessToken] = useLocalStorage('accessToken', '');
    const isAuthenticated = Boolean(accessToken);

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/'); // Redirect to login page if not authenticated
      }
    }, [isAuthenticated]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
