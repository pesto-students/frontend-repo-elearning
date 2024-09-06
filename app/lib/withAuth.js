'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const WithAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const accessToken = localStorage.getItem('accessToken')
    const isAuthenticated = Boolean(accessToken);
    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/'); // Redirect to login page if not authenticated
      }
    }, [isAuthenticated]);

    return <WrappedComponent {...props} />;
  };
};

export default WithAuth;
