'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const WithAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
   
    useEffect(() => {
      const accessToken = localStorage.getItem('accessToken')
      const isAuthenticated = Boolean(accessToken);
      if (!isAuthenticated) {
        router.push('/'); // Redirect to login page if not authenticated
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default WithAuth;
