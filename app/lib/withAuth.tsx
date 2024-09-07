'use client';
import { Alert, Flex, Loader } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const WithAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    let parsedToken;
    useEffect(() => {
      const accessToken = localStorage.getItem('accessToken');
      parsedToken = accessToken ? JSON.parse(accessToken) : null;

      if (parsedToken) {
        setIsAuthenticated(true);
      } else {
        router.push('/'); // Redirect to login page if not authenticated
      }
    }, [router]);
    
    if( parsedToken && !isAuthenticated){
      return <Alert > User not Authenticated </Alert>;
    }
    
    if (isAuthenticated) {
    return <WrappedComponent {...props} />;

    }
    
    return <Flex w="100vw" h="90vh" align="center" justify="center">
      <Loader size={90} />
      
    </Flex>
    
    

    
  };
};

export default WithAuth;
