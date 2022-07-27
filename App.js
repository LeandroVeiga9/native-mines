import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import params from './src/params';
import MineField from './src/components/MineField';
import { createMinedBoard } from './src/functions';

export default function App() {
  const cols = params.getColumsAmount()
  const rows = params.getRowsAmount()
  // const [board, setBoard] = useState()

  const minesAmount = () => {
    return Math.ceil(cols * rows * params.difficultLevel)
  }

  const createState = () => {
    return {
      board: createMinedBoard(rows, cols, minesAmount())
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        <MineField board={createState().board} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#aaa'
  }
});
