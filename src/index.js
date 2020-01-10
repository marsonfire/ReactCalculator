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
            op: 'none',
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
                value: "ERROR! NOT IMPLEMENTED",
            });
        }
        else {
            num = Number(parseFloat(i));
            if (isNaN(num)) {
                num = 0;
            }
            else {
                if (this.state.value !== 0) {
                    this.setState({
                        value: this.state.value + num.toString(),
                    });
                }
                else {
                    this.setState({
                        value: num.toString(),
                    });
                }

                if (this.state.op != null && this.state.mode != null) {
                    if (this.state.value === 0) {
                        num = 1 * Number(num);
                    }
                    else {
                        num = this.state.value + " " + this.state.op + " " + num;
                    }
                    this.setState({
                        value: num,
                        op: 'none',
                        mode: null,
                    });
                }
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
        else if (m === '*') {
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
        else if (m === '.') {
            this.setState({
                value: this.state.value + '.',
            });
        }
        else if (m === '=') {
            //was crashing and needed to make it a string in order to be checked by includes
            //to make sure we can actually click the = and expect something to happen
            var val = this.state.value.toString();
            if(val.includes(" ")){
                this.parseAndDoMath(this.state.value);
            }
        }
        else if (m === '(') {
            this.setState({
                value: this.state.value + '(',
            });
        }
        else if (m === ')') {
            this.setState({
                value: this.state.value + ')',
            });
        }
    }

    parseAndDoMath(func) {
        var numResult;
        var splitFunction = func.split(' ');
        while (splitFunction.length !== 1) {
            var index, num1, num2;
            if (splitFunction.includes('*')) {
                index = splitFunction.indexOf('*');
                num1 = splitFunction[(index - 1)];
                num2 = splitFunction[(index + 1)];
                numResult = Number(num1) * Number(num2);
            }
            else if (splitFunction.includes('/')) {
                index = splitFunction.indexOf('/');
                num1 = splitFunction[(index - 1)];
                num2 = splitFunction[(index + 1)];
                numResult = Number(num1) / Number(num2);
            }
            else if (splitFunction.includes('+')) {
                index = splitFunction.indexOf('+');
                num1 = splitFunction[(index - 1)];
                num2 = splitFunction[(index + 1)];
                numResult = Number(num1) + Number(num2);
            }
            else if (splitFunction.includes('-')) {
                index = splitFunction.indexOf('-');
                num1 = splitFunction[(index - 1)];
                num2 = splitFunction[(index + 1)];
                numResult = Number(num1) - Number(num2);
            }
            var indexOfNum1 = index - 1;
            var indexOfNum2 = index + 1;
            splitFunction[indexOfNum1] = '';
            splitFunction[indexOfNum2] = '';
            splitFunction[index] = numResult;
            splitFunction = splitFunction.filter(function (element) {
                return element !== '';
            });
        }
        this.setState({
            value: numResult,
        });
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
                                <td>{this.putOperatorButtonVale('*')}</td>
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
                            <tr>
                                <td>{this.putOperatorButtonVale('.')}</td>
                                <td>{this.putOperatorButtonVale('=')}</td>
                                {/* <td>{this.putOperatorButtonVale('(')}</td>
                                <td>{this.putOperatorButtonVale(')')}</td> */}
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
