import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {


    state = {
        counter: 0,
        list:this.props.account||[]
    }


    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 10" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 15" clicked={this.props.onSubtractCounter}  />
                <hr />
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.storedResults.map( (el) => <li key={el.id} onClick={ () => this.props.onDeleteResult(el.id)}>{el.value}</li>)}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        ctr: state.ctr.counter,
        storedResults: state.res.results
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({type: 'INCREMENT'}),
        onDecrementCounter: () => dispatch({type: 'DECREMENT'}),
        onAddCounter: () => dispatch({type: 'ADD', val: 10}),
        onSubtractCounter: () => dispatch({type: 'SUBTRACT', val: 15}),
        onStoreResult: (result) => dispatch({type: 'STORE_RESULT', result: result}),
        onDeleteResult: (id) => dispatch({type: 'DELETE_RESULT', resultElId: id}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);