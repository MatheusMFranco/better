import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';

import styles from './Loto.style';
import Chosen from './Chosen';
import Action from '../button/Action';

export class Generator extends Component {

    state = {
        numbers: [],
    }

    randomize = list => {
        const random = Math.ceil(Math.random() * 60) + 1;
        return list.includes(random) ? this.randomize(list) : random;
    };

    generateNumbers = () => {
        const numbers = Array(this.props.amount).fill()
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
                <Action label='GENERATE' onClick={this.generateNumbers} />
                <SafeAreaView style={styles.NumberList}>
                    {this.displayNumbers()}   
                </SafeAreaView>
            </>
        )
    }
}
