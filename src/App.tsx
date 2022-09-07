import { useState } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDebounce } from './customHooks';
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

function App() {
  const [searchVal, setSearchVal] = useState('');

  const debouncedFilter = useDebounce(searchVal, 500);
  const {
    data = { data: [], included: [] },
    fetchStatus,
    isError
  } = useQuery(['vehicles', debouncedFilter], () => fetchVehicles(debouncedFilter), {
    enabled: Boolean(debouncedFilter)
  });

  const fetchVehicles = async (keywords: string) => {
    if (keywords) {
      console.log('fetching with: ', keywords);
      const vehiclesResp = await fetch(
        `https://search.outdoorsy.com/rentals?address=atlanta&filter[keywords]=${keywords}`
      );
      return vehiclesResp.json();
    }
  };

  return (
    <main>
      <SearchForm searchVal={searchVal} setSearchVal={setSearchVal} />
      <VehicleList vehicles={data} fetchStatus={fetchStatus} isError={isError} />
    </main>
  );
}

function SearchForm({ searchVal, setSearchVal }: any) {
  const handleSearchValChange = (e: any) => {
    setSearchVal(e.target.value);
  };

  return (
    <form>
      <input type="text" value={searchVal} onChange={handleSearchValChange} />
    </form>
  );
}

function VehicleList({ vehicles, fetchStatus, isError }: any) {
  const { data, included } = vehicles;

  if (fetchStatus === 'fetching') {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error</span>;
  }

  return (
    <ul>
      {data.map((d: any) => {
        const imageId = d.relationships.primary_image.data.id;
        const vehicleImage = included.find(
          (inc: any) => inc.type === 'images' && inc.id === imageId
        );

        return (
          <li key={d.id}>
            <img src={vehicleImage.attributes.url} alt="Vehicle" className="vehicle-img" />
            {d.attributes.name}
          </li>
        );
      })}
    </ul>
  );
}

export default AppContainer;
