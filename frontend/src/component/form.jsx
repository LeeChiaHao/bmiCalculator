import React, { useState, useEffect } from 'react';
import './form.css'

function Form() {
    const URL = "http://localhost:8080/api/v1/person";
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [showBMI, setBMI] = useState(false);
    const [showSaveEdit, setShowEdit] = useState(false);
    const [data, getData] = useState([])
    const [editID, getEditID] = useState('');

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
        <form>
            {inputCreate("text", "Name", setName)}
            {inputCreate("number", "Age", setAge)}
            {inputCreate("number", "Weight (kg)", setWeight)}
            {inputCreate("number", "Height (m)", setHeight)}
            <button type='button' className='btn btn-secondary m-2' onClick={(e) => calculateBMI(e)}>Calculate</button>
            <button type='submit' className='btn btn-primary' onClick={(e) => submitForm(e)}>Save</button>
            <div className='edit'>
                <button type='button' className='btn btn-info m-2' onClick={(e) => editPerson(e)}>Edit</button>
                <input type="number" className="form-control editID" placeholder="ID to edit" onChange={(e) => getEditID(e.target.value)}></input>
                {saveEdit()}
            </div>
            {bmiResult()}
        </form>
    );

    // create the input field
    // use the keyFunc to set the person's value when input field onchange
    function inputCreate(type, keyWord, keyFunc) {
        return (
            <div className="input-group">
                <span className='input-group-text'>{keyWord}</span>
                <input type={type} step="any" required className='form-control' id={keyWord} placeholder={keyWord} onChange={(e) => keyFunc(e.target.value)} ></input>
            </div>
        )
    }

    // check if bmi can be calculated
    function calculateBMI(e) {
        if (weight !== '' && height !== '') {
            setBMI(true)
        }
        e.preventDefault()
    }

    // show the bmi result if input valid
    function bmiResult() {
        if (showBMI) {
            let bmi = weight / (height * height);
            let result = "Your bmi result is " + bmi.toFixed(4) + ". "
            if (bmi < 5 || bmi > 51) {
                result += "Please make sure you input correct data. Our format is kg and meter."
            } else if (bmi < 18.5) {
                result += "You are underweight. Gain more food!"
            } else if (bmi >= 18.5 && bmi <= 24.9) {
                result += "You are healthy. Good work!"
            } else if (bmi > 25.0 && bmi <= 50) {
                result += "You are overweight. Exercise more!"
            }
            return <h6>{result}</h6>
        } else {
            return <h6>Please input the required field before calculate, save or edit. Thanks.</h6>
        }
    }

    // post request, save the data by passing value to the JSON
    async function submitForm(e) {
        // check all input must have value befor save
        if (name !== '' && age !== '' && weight !== '' && height !== '') {
            const postRequest = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        "name": name,
                        "age": age,
                        "weight": weight,
                        "height": height
                    })
            }
            const response = await fetch(URL, postRequest);
            console.log(response.status);
            e.preventDefault();
        }
    }

    // check if the edit input have exist person, 
    // if yes, then load the data to the form 
    // else, empty the form
    function editPerson(e) {
        let isExist = -1;
        data.map((person, key) => (
            person.id === parseInt(editID) ? isExist = key : -1
        ))
        if (isExist !== -1) {
            let editData = data[isExist];
            document.getElementById("Name").value = editData.name
            setName(editData.name)
            document.getElementById("Age").value = editData.age
            setAge(editData.age)
            document.getElementById("Weight (kg)").value = editData.weight
            setWeight(editData.weight)
            document.getElementById("Height (m)").value = editData.height
            setHeight(editData.height)
            setShowEdit(true)
        } else {
            document.getElementById("Name").value = ""
            setName("")
            document.getElementById("Age").value = ""
            setAge("")
            document.getElementById("Weight (kg)").value = ""
            setWeight("")
            document.getElementById("Height (m)").value = ""
            setHeight("")
            setShowEdit(false)
        }
        e.preventDefault()
    }

    // if editID exist, display the save edit button
    function saveEdit() {
        if (showSaveEdit) {
            return (
                <button type='button' className='btn btn-info m-2' onClick={(e) => editRequest(e)} > Save Edit</button >
            )
        } else {
            return (
                <span className='m-2'>input the person ID to edit the record</span>
            )
        }

    }

    // perform the edit request (PUT)
    async function editRequest(e) {
        console.log(name);
        if (name !== '' && age !== '' && weight !== '' && height !== '') {
            const putRequest = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        "name": name,
                        "age": age,
                        "weight": weight,
                        "height": height
                    })
            }
            const response = await fetch(URL + "/" + editID, putRequest);
            console.log(response.status);
            window.location.reload();
            e.preventDefault();
        }
    }
}

export default Form;