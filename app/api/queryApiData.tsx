import { notifications } from '@mantine/notifications';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAppDispatch } from '../lib/hooks';
import { hideLoader, showLoader } from '../lib/slice';
import hms from './hms';
import restClient from './restClient';

type ApiRequestProps = {
  url: string;
  payload?: any;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  apiType?: 'hms'
};

// Generic function to handle the API request
const fetchApiData = async ({ url = '', payload = {}, method = "GET", apiType }: ApiRequestProps) => {
  const axiosInstance = apiType === 'hms' ? hms : restClient;
  if (method === 'GET') {
    return await axiosInstance.get(url);
  } else {
    return await axiosInstance[method.toLowerCase() as 'post' | 'put' | 'delete'](url, payload);
  }
};

// Common error handler
const handleError = (error: any, context: string) => {
  notifications.show({
    title: 'Error',
    message: "Something went wrong",
    color: 'red',
  });
  console.error(`Error ${context}:`, error);
};

// Use for GET requests with React Query's useQuery
export const useFetchData = (key: string | string[], apiProps: ApiRequestProps) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: async () => {
      dispatch(showLoader());
      try {
        const { data } = await fetchApiData(apiProps);
        dispatch(hideLoader());
        return data;
      } catch (error) {
        dispatch(hideLoader());
        throw error;
      }
    },
    onError: (error: any) => {
      handleError(error, 'fetching data');
      dispatch(hideLoader());
    },
    retry: false, // Disable retrying failed requests, or customize retry logic
  });
};

// Use for POST, PUT, DELETE requests with React Query's useMutation
export const useMutateData = () => {
  const dispatch = useAppDispatch();

  return useMutation(
    async (props: ApiRequestProps) => {
      dispatch(showLoader());
      return await fetchApiData(props);
    },
    {
      onError: (error) => {
        handleError(error, 'mutating data');
        dispatch(hideLoader());
      },
      onSuccess: (data) => {
        dispatch(hideLoader());
        return data;
        // Do something on success, like refetching related queries
      },
    }
  );
};
