import type { FetchStatus } from '@tanstack/react-query';
import { VehicleData, VehicleDataItem } from '../../types';
import Vehicle from '../Vehicle/Vehicle';
import './VehicleList.css';

interface Props {
  vehicleData: VehicleData;
  fetchStatus: FetchStatus;
  isError: boolean;
  isLoading: boolean;
}

function VehicleList({ vehicleData, fetchStatus, isError, isLoading }: Props) {
  const { data, included } = vehicleData;

  if (fetchStatus === 'fetching') {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error fetching vehicles...</span>;
  }

  if (!isLoading && data.length === 0) {
    return <div>No results</div>;
  }

  return (
    <ul>
      {data.map((d: VehicleDataItem) => (
        <Vehicle key={d.id} data={d} included={included} />
      ))}
    </ul>
  );
}

export default VehicleList;
