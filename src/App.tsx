import { useState } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchForm from './components/SearchForm/SearchForm';
import VehicleList from './components/VehicleList/VehicleList';
import { useDebounce } from './customHooks';
import config from './config';
import './App.css';

const { rentalsEndpoint, city, refetchOnWindowFocus, defaultData } = config;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus
    }
  }
});

function AppContainer() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

function App() {
  const [searchVal, setSearchVal] = useState('');
  const debouncedFilter = useDebounce(searchVal, 500);
  const {
    data = defaultData,
    fetchStatus,
    isError,
    isLoading
  } = useQuery(['vehicles', debouncedFilter], () => fetchVehicles(debouncedFilter), {
    enabled: Boolean(debouncedFilter)
  });

  const fetchVehicles = async (keywords: string) => {
    if (keywords) {
      const vehiclesResp = await fetch(
        `${rentalsEndpoint}?address=${city}&filter[keywords]=${keywords}`
      );
      return vehiclesResp.json();
    }
  };

  return (
    <main>
      <SearchForm searchVal={searchVal} setSearchVal={setSearchVal} />
      <VehicleList
        vehicleData={data}
        fetchStatus={fetchStatus}
        isError={isError}
        isLoading={isLoading}
      />
    </main>
  );
}

export default AppContainer;
