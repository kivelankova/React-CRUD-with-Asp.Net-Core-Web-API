import React from 'react'
import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';





const BarType = () => {


    // State 
    const [barTypes, setBarTypes] = useState([]);




    // Fetch Tulokset
    useEffect(() => {
        const fetchResults = async () => {
            const res = await fetch(process.env.REACT_APP_API + 'KuormaTyyppi')
            const data = await res.json()
            setBarTypes(data);
            console.log("data :", data);
        }
        fetchResults()
    }, [])

    // mäpätään nimikkeet-taulukon rivit
    const rows = barTypes.map((bar) => {
        return (
            <tr  >
                <th>{bar.BarTypeId}</th>
                <th>{bar.Tyyppi}</th>
                <th>{bar.Kuvaus}</th>
            </tr>
        );
    })



    return (
        <div className='container'>
            <div className='m-3 d-flex justify-content-center'>
                <h1>Tulokset backend:stä</h1>

                <Table striped bordered hover>
                    <thead>
                        <tr>

                            <th>ID</th>
                            <th>TYYPPI</th>
                            <th>KUVAUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
            </div>
        </div>

    )
}

export default BarType
