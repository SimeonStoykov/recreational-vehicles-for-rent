import type { VehicleDataItem } from '../../types';
import './Vehicle.css';

interface Props {
  data: VehicleDataItem;
  included: VehicleDataItem[];
}

function Vehicle({ data, included }: Props) {
  const imageId = data.relationships.primary_image.data.id;
  const vehicleImage = included.find(
    (inc: VehicleDataItem) => inc.type === 'images' && inc.id === imageId
  );

  return (
    <li>
      <img src={vehicleImage?.attributes.url} alt="Vehicle" className="vehicle-img" />
      <span className="vehicle-name">{data.attributes.name}</span>
    </li>
  );
}

export default Vehicle;
