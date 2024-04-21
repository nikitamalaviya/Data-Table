import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

const Data = () => {

    const [data,setdata] = useState([]);
    const [input, setInput] = useState('');

    const name = useRef();
    const price =  useRef();
    const desc =  useRef();

    const fetchData=()=>{
        axios.get('http://localhost:3001/data').then((res)=>{
            setdata(res.data)
        })
    }


    const handleSubmit=()=>{
        const Data={
            name:name.current.value,
            price:price.current.value,
            decs:desc.current.value,
        }
        axios.post('http://localhost:3001/data', Data).then((res)=>{
            setdata([...data, res.data])
        })
    }

    const DeleteData=(id)=>{
        axios.delete(`http://localhost:3001/data/${id}`).then(()=>{
            setdata(data.filter((val)=>val.id !==id));
        })
    }


    const filterdata=data.filter((item)=>{
        return item.name.startsWith(input.toLowerCase());
    });


    useEffect(()=>{
        fetchData();
    },[]);


  return (
    <>
    {/*--------------------- form ----------------------*/}
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-4">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-light text-center">
                            Enter Your Product
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Product Name :- </label>
                                    <input type="text" className="form-control" placeholder="Enter product name" ref={name} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Price :- </label>
                                    <input type="number" className="form-control" placeholder="Enter price" ref={price} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description :-</label>
                                    <input type="text" className="form-control" placeholder="Enter desc..." ref={desc} />
                                </div>
                                <div className="d-grid gap-2 mb-3">
                                    <button onClick={handleSubmit} className="btn btn-success mx-3">Add In Product List</button>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Search Your Product :-</label>
                                    <input type="text" className="form-control" placeholder="Enter your productname" value={input} onChange={(e) => setInput(e.target.value)} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    {/*----------------------------------- table ---------------------------------------------*/}
    <h1 className='mt-5 text-center' style={{fontWeight:'bold', fontStyle:'capitalized'}}>Product List:-</h1>
    <table className='table mt-5'>
        <thead>
            <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {filterdata.map((val)=>{
                <tr key={val.id}>
                    <td>{val.id}</td>
                    <td>{val.name}</td>
                    <td>{val.price}</td>
                    <td>{val.desc}</td>
                    <td>
                        <button onClick={()=>DeleteData(val.id)} className='btn btn-danger'>DELETE</button>
                    </td>
                </tr>
            })}
        </tbody>
    </table>
    </>
  )
}

export default Data
