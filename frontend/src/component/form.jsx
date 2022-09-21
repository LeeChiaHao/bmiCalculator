import React, { useState } from 'react';
// import TableView from './tableView';
import './form.css'
// import 'bootstrap/dist/css/bootstrap.css'

function Form() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [showBMI, setBMI] = useState(false);

    return (
        <form>
            {inputCreate("text", "Name", setName)}
            {inputCreate("number", "Age", setAge)}
            {inputCreate("number", "Weight (kg)", setWeight)}
            {inputCreate("number", "Height (m)", setHeight)}
            <button type='button' className='btn btn-secondary m-2' onClick={(e) => calculateBMI(e)}>Calculate</button>
            <button type='submit' className='btn btn-primary' onClick={(e) => submitForm(e)}>Save</button>
            {bmiResult()}
        </form>
    );

    // create the input field
    // use the keyFunc to set the person's value when input field onchange
    function inputCreate(type, keyWord, keyFunc) {
        return (
            <div className="input-group">
                <span className='input-group-text'>{keyWord}</span>
                <input type={type} step="any" required className='form-control' placeholder={keyWord} onChange={(e) => keyFunc(e.target.value)} ></input>
            </div>
        )
    }

    // check if bmi can be calculated
    function calculateBMI(e) {
        if (weight !== '' && height !== '') {
            setBMI(true)
        }
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
            return <h6>Please input the required field before calculate or save. Thanks.</h6>
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
            const response = await fetch('http://localhost:8080/api/v1/person', postRequest);
            console.log(response.status);
            e.preventDefault();
        }
    }
}

export default Form;