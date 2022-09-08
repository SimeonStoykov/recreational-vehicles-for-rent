import type { FetchStatus } from '@tanstack/react-query';
import ReactLoading from 'react-loading';
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
    return (
      <ReactLoading className="data-state" type="bubbles" color="black" height={50} width={100} />
    );
  }

  if (isError) {
    return <p className="data-state">Error fetching vehicles...</p>;
  }

  if (!isLoading && data.length === 0) {
    return <p className="data-state">No results</p>;
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
