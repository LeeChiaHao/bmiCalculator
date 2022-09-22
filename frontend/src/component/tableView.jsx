import React, { useState, useEffect } from 'react';
import './tableView.css'

function TableView() {
    const [data, getData] = useState([])
    const URL = "http://localhost:8080/api/v1/person";

    useEffect(() => {
        fetchData()
    }, [])

    // get request, set the message to the data using getData function
    const fetchData = () => {
        fetch(URL)
            .then((response) => response.json())
            .then((message) => { getData(message); })
    }

    return (
        <table className='table table-hover'>
            <tbody>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Weight(kg)</th>
                    <th>Height(m)</th>
                    <th>BMI(kg/(m*m))</th>
                </tr>
                {/* loop the data to display it in the table */}
                {data.map((person, i) => (
                    <tr key={i}>
                        <td>{person.id}</td>
                        <td>{person.name}</td>
                        <td>{person.age}</td>
                        <td>{person.weight}</td>
                        <td>{person.height}</td>
                        <td>{person.bmi}</td>
                        <td>
                            <button type='submit' className='btn btn-danger' onClick={(e) => { deletePerson(e, person.id) }}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    // perform the delete request (DELETE)
    async function deletePerson(e, id) {
        await fetch(URL + "/" + id, { method: 'DELETE' });
        window.location.reload();
        e.preventDefault();
    }
}

export default TableView;