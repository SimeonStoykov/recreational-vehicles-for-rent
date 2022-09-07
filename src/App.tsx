import { useState } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchForm from './components/SearchForm/SearchForm';
import VehicleList from './components/VehicleList/VehicleList';
import { useDebounce } from './customHooks';
import type { VehicleData } from './types';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
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

const defaultData: VehicleData = { data: [], included: [] };

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
        `https://search.outdoorsy.com/rentals?address=atlanta&filter[keywords]=${keywords}`
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
