import React from 'react';
import ReactDom from 'react-dom';
import "./index.css";


function Button(props) {
    return (
        <button onClick={props.onClick}>
            {props.value}
        </button>
    )
}

function TextBox(props) {
    return (
        <label>
            {props.value}
        </label>
    )
}

class ButtonTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        }
    }

    putTextBox(i) {
        return <TextBox
            value={i}
        />;
    }

    putButtonValue(i) {
        return <Button
            value={i}
            onClick={() => this.buttonClick(i)}
        />;
    }

    buttonClick(i) {
        var num = parseInt(i);
        if (isNaN(num)) {
            this.setState({
                value: "ERROR",
            })
        }
        else {
            var valueNum = Number(parseInt(this.state.value));
            if (isNaN(valueNum)) {
                valueNum = 0;
            }
            var setNum = Number(valueNum) + Number(i);
            this.setState({
                value: setNum,
            });
        }
    }

    render() {
        let currentTotal = this.state.value;
        return (
            <div>
                {this.putTextBox(currentTotal)}
                <table>
                    <tbody>
                        <tr>
                            <td>{this.putButtonValue('P')}</td>
                            <td>{this.putButtonValue('C')}</td>
                            <td>{this.putButtonValue('x^2')}</td>
                            <td>{this.putButtonValue('/')}</td>
                        </tr>
                        <tr>
                            <td>{this.putButtonValue('7')}</td>
                            <td>{this.putButtonValue('8')}</td>
                            <td>{this.putButtonValue('9')}</td>
                            <td>{this.putButtonValue('x')}</td>
                        </tr>
                        <tr>
                            <td>{this.putButtonValue('4')}</td>
                            <td>{this.putButtonValue('5')}</td>
                            <td>{this.putButtonValue('6')}</td>
                            <td>{this.putButtonValue('-')}</td>
                        </tr>
                        <tr>
                            <td>{this.putButtonValue('1')}</td>
                            <td>{this.putButtonValue('2')}</td>
                            <td>{this.putButtonValue('3')}</td>
                            <td>{this.putButtonValue('+')}</td>
                        </tr>
                        <tr>
                            <td>{this.putButtonValue('+/-')}</td>
                            <td>{this.putButtonValue('0')}</td>
                            <td>{this.putButtonValue('.')}</td>
                            <td>{this.putButtonValue('=')}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

class Calculator extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="centered">
                    <ButtonTable />
                </div>
            </div>
        )
    }
}

// ========================================

ReactDom.render(
    <Calculator />,
    document.getElementById('root')
);
