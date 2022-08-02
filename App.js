import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import params from './src/params';
import MineField from './src/components/MineField';
import Header from './src/components/Header';
import { 
  createMinedBoard,
  cloneBoard,
  openField,
  hasExplosion,
  showMines,
  wonGame as getWon,
  invertFlag,
  flagsUsed
} from './src/functions';

export default function App() {
  const cols = params.getColumsAmount()
  const rows = params.getRowsAmount()

  const minesAmount = () => {
    return Math.ceil(cols * rows * params.difficultLevel)
  }

  const [board, setBoard] = useState(createMinedBoard(rows, cols, minesAmount()))
  const [won, setWon] = useState(false)
  const [lost, setLost] = useState(false)
  const boardClone = cloneBoard(board)
  const lostGame = hasExplosion(boardClone)
  const wonGame = getWon(boardClone)

  const onOpenField = (row, column) => {
    openField(boardClone, row, column)

    if (lostGame) {
      showMines(boardClone)
      Alert.alert('Perdeu')
    }

    if (wonGame) {
      Alert.alert('parabens')
    }

    setBoard(boardClone)
    setLost(lostGame)
    setWon(wonGame)
  }

  const onSelectField = (row, col) => {
    invertFlag(boardClone, row, col)
    
    if (wonGame) {
      Alert.alert('parabens')
    }

    setBoard(boardClone)
    setWon(wonGame)
  }

  const createState = () => {
    setBoard(createMinedBoard(rows, cols, minesAmount()))
    setLost(false)
    setWon(false)
  }

  return (
    <View style={styles.container}>
      <Header 
        flagsLeft={minesAmount() - flagsUsed(board)}
        onNewGame={() => createState()}
        onFlagPress={() => {}}
      />
      <View style={styles.board}>
        <MineField 
          board={board}
          onOpenField={onOpenField}
          onSelectField={onSelectField}
        />
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
