import { Component } from 'react'
class Header extends Component {
    state = {}
    headerStyle = {
        "background-color": "black",
        "opacity": "50%",
        "color": "white",
        "padding": "10px",
        "font-size": "x-large",
        "text-align": "center",
        "text-bold": "bolder"
    }
    render() {
        return (
            <div style={this.headerStyle}>
                BMI Calculator
            </div>
        )
    }
}

export default Header;