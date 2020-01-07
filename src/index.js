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

    putOperatorButtonVale(m){
        return <Button
            mode={m}
            onClick={() => this.opButtonClick(m)}
        />
    }

    buttonClick(i, m) {
        var num = parseInt(i);
        //if nan, then we're on an operator
        if(isNaN(num)){
            this.setState({
                value: "ERROR! SHOULD ONLY BE NUMBERS",
            });
        }
        else{
            num = Number(parseFloat(i));
            if(isNaN(num)){
                //can happen if we just had an error
                //easier for when testing too...
                num = 0; 
            }
            else if(m === 0){
                num = Number(this.state.value) + Number(num);
                this.setState({
                    value: num,
                });
            }
            else if(m === 1){
                num = Number(this.state.value) * Number(num);
                this.setState({
                    value: num,
                });
            }
            else if(m === 2){
                num = Number(this.state.value) - Number(num);
                this.setState({
                    value: num,
                });
            }
            else if(m === 3){
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
    opButtonClick(m){
        if(m === '+'){
            //console.log("setting to addition");
            this.setState({
                mode: 0,
                op: m,
            });
        }
        else if(m === 'x'){
            //console.log("setting to multiplication");
            this.setState({
                mode: 1,
                op: m,
            });
        }
        else if(m === '-'){
            //console.log("setting to subtraction");
            this.setState({
                mode: 2,
                op: m,
            });
        }
        else if(m === '/'){
            //console.log("setting to division");
            this.setState({
                mode: 3,
                op: m,
            });
        }
    }

    render() {
        return (
            <div>
                {this.putTextBox("Sum: " + this.state.value, "Operator: " + this.state.op)}
                <table>
                    <tbody>
                        <tr>
                            <td>{this.putOperatorButtonVale('P')}</td>
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
                            <td>{this.putOperatorButtonVale('.')}</td>
                            <td>{this.putOperatorButtonVale('=')}</td>
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
