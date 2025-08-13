import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { memo, useState, type FormEvent } from 'react';
import { apiCountry } from '../../api/api';

const country = () => {

    const resetForm = () => {
        setText("");
        setPrice("");
        setStore("");
        setBrand("");
        setEditingItem(null);
    };


    const quaryClient = useQueryClient()
    const [editingItem, setEditingItem] = useState<any>(null)

    console.log(editingItem);


    const [text, setText] = useState("")
    const [price, setPrice] = useState("")
    const [store, setStore] = useState("")
    const [brand, setBrand] = useState("")

    const { data } = useQuery({
        queryKey: ["country"],
        queryFn: () => apiCountry.get("country").then(res => res.data)
    })
    console.log(data);

    const mutation = useMutation({
        mutationFn: (data: any) => apiCountry.post("country", data),
        onSuccess: () => {
            quaryClient.invalidateQueries({ queryKey: ["country"] })
            resetForm();
        }
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let newMutation = {
            text,
            price,
            store,
            brand
        }
        if (editingItem) {
            updateMutation.mutate({ id: editingItem.id, data: newMutation })
        } else {
            mutation.mutate(newMutation)
        }
    }

    const deleteMutation = useMutation({
        mutationFn: (id: string) => apiCountry.delete(`country/${id}`),
        onSuccess: () => {
            quaryClient.invalidateQueries({ queryKey: ["country"] })
        }
    })

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string, data: any }) => apiCountry.put(`country/${id}`, data),
        onSuccess: () => {
            quaryClient.invalidateQueries({ queryKey: ["country"]})
            resetForm();
        }
    })

    const handleUpdate = (item: any) => {
        setEditingItem(item)
        setText(item.text)
        setBrand(item.brand)
        setPrice(item.price)
        setStore(item.store)
    }

    return (
        <div>
            <div className="flex justify-center items-center">
                <form onSubmit={handleSubmit} className='w-[300px] border bg-[#303030] p-[10px] rounded-[7px]' action="">
                    <h1 className='text-white text-[30px] mb-[10px]'>Phone</h1>
                    <input value={text} required onChange={(e) => setText(e.target.value)} className='border-0 bg-white w-[100%] h-[30px] pl-[5px] rounded-[3px] mb-[10px]' type="text" placeholder='Enter your country name' />
                    <input value={price} required onChange={(e) => setPrice(e.target.value)} className='border-0 bg-white w-[100%] h-[30px] pl-[5px] rounded-[3px] mb-[10px]' type="text" placeholder='Enter your country price' />
                    <input value={store} required onChange={(e) => setStore(e.target.value)} className='border-0 bg-white w-[100%] h-[30px] pl-[5px] rounded-[3px] mb-[10px]' type="text" placeholder='Enter your country storage' />
                    <input value={brand} required onChange={(e) => setBrand(e.target.value)} className='border-0 bg-white w-[100%] h-[30px] pl-[5px] rounded-[3px] mb-[10px]' type="text" placeholder='Enter your country brand' />
                    <button className='border w-[100%] rounded-[3px] mb-[10px] bg-white text-[#303030] h-[30px]' type='submit'>Submit</button>
                </form>
            </div>
            <div className='flex-wrap flex mt-[50px] gap-[30px] ml-[10px]'>
                {
                    data?.map((item: any) => (
                        <div key={item.id} className='w-[250px] p-[10px] text-white rounded-[7px] bg-[#303030]'>
                            <p>{item.text}</p>
                            <p>{item.store} GB</p>
                            <p>{item.brand}</p>
                            <p className='mb-[10px]'>{item.price} $</p>
                            <div className='flex gap-[10px]'>
                                <button onClick={() => handleUpdate(item)} className='w-[50%] cursor-pointer bg-[#fff] text-[#303030] border-0 rounded-[3px]'>Update</button>
                                <button onClick={() => deleteMutation.mutate(item.id)} className='w-[50%] bg-[#fff] cursor-pointer text-[#303030] border-0 rounded-[3px]' >Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default memo(country);

