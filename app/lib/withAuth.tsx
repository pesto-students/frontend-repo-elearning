'use client';
import { Alert } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const WithAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const accessToken = localStorage.getItem('accessToken');
      const parsedToken = accessToken ? JSON.parse(accessToken) : null;

      if (parsedToken) {
        setIsAuthenticated(true);
      } else {
        router.push('/'); // Redirect to login page if not authenticated
      }
    }, [router]);

    if (!isAuthenticated) {
      return <Alert > User not Authenticated </Alert>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default WithAuth;