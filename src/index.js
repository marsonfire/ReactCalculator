import React from 'react';
import ReactDom from 'react-dom';
import "./index.css";


function Button(props) {
    return (
        <button onClick={props.onClick}>
            {props.value}
            {props.mode}
        </button>
    )
}

function TextBox(props) {
    return (
        <label>
            {props.value}
            {props.op}
        </label>
    )
}

class ButtonTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            mode: 0,
            op: '+',
        }
    }

    putTextBox(i, o) {
        return <TextBox
            value={i}
            op={o}
        />;
    }

    putNumberButtonValue(i) {
        return <Button
            value={i}
            onClick={() => this.buttonClick(i, this.state.mode)}
        />;
    }

    putOperatorButtonVale(m) {
        return <Button
            mode={m}
            onClick={() => this.opButtonClick(m)}
        />
    }

    buttonClick(i, m) {
        var num = parseInt(i);
        //if nan, then we're on an operator
        if (isNaN(num)) {
            this.setState({
                value: "ERROR! SHOULD ONLY BE NUMBERS",
            });
        }
        else {
            num = Number(parseFloat(i));
            if (isNaN(num)) {
                num = 0;
            }
            else if (m === 0) {
                num = Number(this.state.value) + Number(num);
                this.setState({
                    value: num,
                });
            }
            else if (m === 1) {
                //figure out updateState when refactoring
                if (this.state.value === 0) {
                    num = 1 * Number(num);
                    this.setState({
                        value: num,
                    });
                }
                else {
                    num = Number(this.state.value) * Number(num);
                    this.setState({
                        value: num,
                    });
                }
            }
            else if (m === 2) {
                num = Number(this.state.value) - Number(num);
                this.setState({
                    value: num,
                });
            }
            else if (m === 3) {
                num = Number(this.state.value) / Number(num);
                this.setState({
                    value: num,
                });
            }
        }
    }

    //m = mode
    //mode 0 = add
    //mode 1 = multiply
    //mode 2 = subtract
    //mode 3 = divide
    opButtonClick(m) {
        if (m === '+') {
            this.setState({
                mode: 0,
                op: m,
            });
        }
        else if (m === 'x') {
            this.setState({
                mode: 1,
                op: m,
            });
        }
        else if (m === '-') {
            this.setState({
                mode: 2,
                op: m,
            });
        }
        else if (m === '/') {
            this.setState({
                mode: 3,
                op: m,
            });
        }
        else if (m === '%') {
            var percentageValue = this.state.value / 100;
            this.setState({
                value: percentageValue,
            });
        }
        else if (m === 'C') {
            this.setState({
                value: 0,
            });
        }
        else if (m === 'x^2') {
            var valueSquared = this.state.value * this.state.value;
            this.setState({
                value: valueSquared,
            });
        }
        else if (m === '+/-') {
            var oppositeValue = this.state.value * -1;
            this.setState({
                value: oppositeValue,
            });
        }
        else if (m === '1/x') {
            var reciprocalValue = 1 / this.state.value;
            this.setState({
                value: reciprocalValue,
            });
        }
        else if (m === 'x^(1/2)') {
            var sqrRootValue = Math.sqrt(this.state.value);
            this.setState({
                value: sqrRootValue,
            });
        }
    }

    render() {
        return (
            <div>
                <h1>Welcome to the Calculator </h1>
                <div className="centered">
                    {this.putTextBox(this.state.value)}
                    {this.putTextBox("Operator: " + this.state.op)}
                    <table>
                        <tbody>
                            <tr>
                                <td>{this.putOperatorButtonVale('%')}</td>
                                <td>{this.putOperatorButtonVale('C')}</td>
                                <td>{this.putOperatorButtonVale('x^2')}</td>
                                <td>{this.putOperatorButtonVale('/')}</td>
                            </tr>
                            <tr>
                                <td>{this.putNumberButtonValue('7')}</td>
                                <td>{this.putNumberButtonValue('8')}</td>
                                <td>{this.putNumberButtonValue('9')}</td>
                                <td>{this.putOperatorButtonVale('x')}</td>
                            </tr>
                            <tr>
                                <td>{this.putNumberButtonValue('4')}</td>
                                <td>{this.putNumberButtonValue('5')}</td>
                                <td>{this.putNumberButtonValue('6')}</td>
                                <td>{this.putOperatorButtonVale('-')}</td>
                            </tr>
                            <tr>
                                <td>{this.putNumberButtonValue('1')}</td>
                                <td>{this.putNumberButtonValue('2')}</td>
                                <td>{this.putNumberButtonValue('3')}</td>
                                <td>{this.putOperatorButtonVale('+')}</td>
                            </tr>
                            <tr>
                                <td>{this.putOperatorButtonVale('+/-')}</td>
                                <td>{this.putNumberButtonValue('0')}</td>
                                <td>{this.putOperatorButtonVale('1/x')}</td>
                                <td>{this.putOperatorButtonVale('x^(1/2)')}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

class Calculator extends React.Component {
    render() {
        return (
            <div className="container">
                <ButtonTable />
            </div>
        )
    }
}

// ========================================

ReactDom.render(
    <Calculator />,
    document.getElementById('root')
);
