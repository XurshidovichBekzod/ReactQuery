import { memo } from 'react';
import { useFetch } from '../../hook/useFetch';

const Country = () => {
  useFetch("Countrys")
  return (
    <div className="Country">
      <h2>Country</h2>
    </div>
  );
};

export default memo(Country);