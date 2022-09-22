import { Component } from 'react'
class Header extends Component {
    state = {}
    headerStyle = {
        "backgroundColor": "black",
        "opacity": "50%",
        "color": "white",
        "padding": "10px",
        "fontSize": "x-large",
        "textAlign": "center",
        "textBold": "bolder"
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