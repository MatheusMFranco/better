import React, { Component } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native';

import styles from './Loto.style';
import Chosen from './Chosen';

export class Generator extends Component {

    state = {
        amount: 6,
        numbers: [],
    }

    updateAmount = size => this.setState({ amount: +size});

    randomize = list => {
        const random = Math.ceil(Math.random() * 60) + 1;
        return list.includes(random) ? this.randomize(list) : random;
    };

    generateNumbers = () => {
        const numbers = Array(this.state.amount).fill()
            .reduce(list => [...list, this.randomize(list)], [])
            .sort((a, b) => a - b);
        this.setState({ numbers });
    }

    displayNumbers = () => {
        const list = this.state.numbers;
        return list.map(chosen => <Chosen key={chosen} chosen={chosen} />);
    }

    render() {
        return (
            <>
                <Text style={styles.TextDefault}>Chose the number amount:</Text>
                <TextInput
                    style={[styles.Input, styles.TextDefault]}
                    keyboardType={'numeric'} 
                    placeholder="Amount" 
                    value={`${this.state.amount}`}
                    onChangeText={this.updateAmount} />
                <TouchableOpacity style={styles.Button} onPress={this.generateNumbers}>
                    <Text style={[styles.TextDefault, styles.ButtonText]}>Generate!</Text>
                </TouchableOpacity>
                <SafeAreaView style={styles.NumberList}>
                    {this.displayNumbers()}   
                </SafeAreaView>
            </>
        )
    }
}
