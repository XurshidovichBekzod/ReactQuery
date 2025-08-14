import { memo, useState, type FormEvent } from 'react';
import { useFetch } from '../../hook/useFetch';
import { apiCountry } from '../../api/api';

interface ICountrys {
  name: string;
  capital: string;
  population: string;
  area: string;
  id?: string;
}

const initialState: ICountrys = {
  name: '',
  capital: '',
  population: '',
  area: '',
};

const Country = () => {
  const [formData, setFormData] = useState<ICountrys>(initialState);
  const [editId, setEditId] = useState<string | null>(null);

  const { data, loading, error, refetch } = useFetch<ICountrys[]>("Countrys");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (editId) {
        const { name, capital, population, area } = formData;
        await apiCountry.put(`/Countrys/${editId}`, { name, capital, population, area });
      } else {
        const { name, capital, population, area } = formData;
        await apiCountry.post("/Countrys", { name, capital, population, area });
      }
      setFormData(initialState);
      setEditId(null);
      await refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (country: ICountrys) => {
    const { id, name, capital, population, area } = country;
    setFormData({ name, capital, population, area });
    setEditId(id || null);
  };

  const handleDelete = async (id: string) => {
    try {
      await apiCountry.delete(`/Countrys/${id}`);
      await refetch();
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="Country">

      <div className='flex justify-center'>
        <form onSubmit={handleSubmit} className="w-[300px] border bg-[#303030] p-[10px] rounded-[7px]">
          <h1 className="text-white text-[30px] mb-[10px]">Country</h1>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border-0 bg-white w-full h-[30px] pl-[5px] rounded-[3px] mb-[10px]"
            type="text"
            placeholder="Enter country name"
            required
          />
          <input
            name="capital"
            value={formData.capital}
            onChange={handleChange}
            className="border-0 bg-white w-full h-[30px] pl-[5px] rounded-[3px] mb-[10px]"
            type="text"
            placeholder="Enter capital"
            required
          />
          <input
            name="population"
            value={formData.population}
            onChange={handleChange}
            className="border-0 bg-white w-full h-[30px] pl-[5px] rounded-[3px] mb-[10px]"
            type="text"
            placeholder="Enter population"
            required
          />
          <input
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="border-0 bg-white w-full h-[30px] pl-[5px] rounded-[3px] mb-[10px]"
            type="text"
            placeholder="Enter area"
            required
          />
          <button className="border w-full rounded-[3px] mb-[10px] bg-white text-[#303030] h-[30px]" type="submit">Submit</button>
        </form>
      </div>


      <div className='flex-wrap flex mt-[50px] gap-[30px] ml-[10px]'>
        {data?.map((item) => (
          <div key={item.id} className="className='w-[350px] p-[10px] text-white rounded-[7px] bg-[#303030]">
            <h3>{item.name}</h3>
            <p>Capital: {item.capital}</p>
            <p>Population: {item.population}</p>
            <p>Area: {item.area} km²</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => handleEdit(item)} className='w-[50%] cursor-pointer bg-[#fff] text-[#303030] border-0 rounded-[3px]'>Edit</button>
              <button onClick={() => item.id && handleDelete(item.id)} className='w-[50%] cursor-pointer bg-[#fff] text-[#303030] border-0 rounded-[3px]'>Delete </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Country);
