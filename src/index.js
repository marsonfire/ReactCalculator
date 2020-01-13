import React from 'react';
import ReactDom from 'react-dom';
import "./index.css";


function NumButton(props) {
    return (
        <button className="numButton" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

function OpButton(props) {
    return (
        <button className="opButton" onClick={props.onClick}>
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
        return <NumButton
            value={i}
            onClick={() => this.buttonClick(i, this.state.mode)}
            
        />;
    }

    putOperatorButtonVale(m) {
        return <OpButton
            mode={m}
            onClick={() => this.opButtonClick(m)}
        />
    }

    buttonClick(i) {
        var num = Number(parseFloat(i));
        //shouldn't happen 
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

    //m = the 'mode' or operation we're currently using
    //based on the button, we do what is needed accordingly
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
            if (val.includes(" ")) {
                this.parseAndDoMath(this.state.value);
            }
        }
    }

    //func = this.state.value -> that's the string function that's been created by the user 
    //using the calculator. Take that input and correctly read it in and calculate the answer
    //based on it. 
    parseAndDoMath(func) {
        var numResult, index;
        //split our function where there are spaces because that's how it's input into 
        //the calculator -> gives us an array of the function 
        var splitFunction = func.split(' ');
        //Loop through our split up function as long as our split up array of it has more than 1
        //element in it. Length > 1 means we have more math to do.
        while (splitFunction.length > 1) {
            //Order of operations
            //Each if statement finds the index of the operator and does the correct math on it
            if (splitFunction.includes('*')) {
                index = splitFunction.indexOf('*');
                numResult = this.multiply(splitFunction, index);
            }
            else if (splitFunction.includes('/')) {
                index = splitFunction.indexOf('/');
                numResult = this.division(splitFunction, index);
            }
            else if (splitFunction.includes('+')) {
                index = splitFunction.indexOf('+');
                numResult = this.addition(splitFunction, index);
            }
            else if (splitFunction.includes('-')) {
                index = splitFunction.indexOf('-');
                numResult = this.subtraction(splitFunction, index);
            }
            //Clear out the array indices where num1 and num2 were, because we're done with them
            //and will remove them from the array so we can loop again without them in the way.
            var indexOfNum1 = index - 1;
            var indexOfNum2 = index + 1;
            splitFunction[indexOfNum1] = '';
            splitFunction[indexOfNum2] = '';
            splitFunction[index] = numResult;

            //quick modification of this:
            //https://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript
            //remove empty elements from the array
            splitFunction = splitFunction.filter(function (element) {
                return element !== '';
            });
        }
        //need to set the calculator value to display the result when done doing math
        this.setState({
            value: numResult,
        });
    }

    //#region Math Functions 
    //Each of the following takes in the function we're currently caculating as an array and
    //the index of the operator we're using. Then, with that index, we find the 2 numbers that 
    //we'll perform the operation on, and return the result accordingly. 

    multiply(splitArray, index) {
        var num1 = splitArray[(index - 1)];
        var num2 = splitArray[(index + 1)];
        return Number(num1) * Number(num2);
    }

    division(splitArray, index) {
        var num1 = splitArray[(index - 1)];
        var num2 = splitArray[(index + 1)];
        return Number(num1) / Number(num2);
    }

    addition(splitArray, index) {
        var num1 = splitArray[(index - 1)];
        var num2 = splitArray[(index + 1)];
        return Number(num1) + Number(num2);
    }

    subtraction(splitArray, index) {
        var num1 = splitArray[(index - 1)];
        var num2 = splitArray[(index + 1)];
        return Number(num1) - Number(num2);
    }
    //#endregion

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
                                <td>{this.putOperatorButtonVale('x^2')}</td>
                                <td>{this.putOperatorButtonVale('x^(1/2)')}</td>
                                <td>{this.putOperatorButtonVale('C')}</td>
                            </tr>
                            <tr>
                                <td>{this.putNumberButtonValue('7')}</td>
                                <td>{this.putNumberButtonValue('8')}</td>
                                <td>{this.putNumberButtonValue('9')}</td>
                                <td>{this.putOperatorButtonVale('/')}</td>
                            </tr>
                            <tr>
                                <td>{this.putNumberButtonValue('4')}</td>
                                <td>{this.putNumberButtonValue('5')}</td>
                                <td>{this.putNumberButtonValue('6')}</td>
                                <td>{this.putOperatorButtonVale('*')}</td>
                            </tr>
                            <tr>
                                <td>{this.putNumberButtonValue('1')}</td>
                                <td>{this.putNumberButtonValue('2')}</td>
                                <td>{this.putNumberButtonValue('3')}</td>
                                <td>{this.putOperatorButtonVale('-')}</td>
                            </tr>
                            <tr>
                                <td>{this.putOperatorButtonVale('+/-')}</td>
                                <td>{this.putNumberButtonValue('0')}</td>
                                <td>{this.putOperatorButtonVale('1/x')}</td>
                                <td>{this.putOperatorButtonVale('+')}</td>
                            </tr>
                            <tr>
                                <td colSpan='2'>{this.putOperatorButtonVale('.')}</td>
                                <td colSpan='2'>{this.putOperatorButtonVale('=')}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

//#region M Buttons
//why none of those 'M' buttons you ask, well does anyone know what those things actually do?????????
//#endregion 

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
