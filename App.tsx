import { useRef, useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { PositionChangeEvent, SheetDetent, TrueSheet } from '@lodev09/react-native-true-sheet';

export default function App() {
  const sheetRef = useRef<TrueSheet>(null);
  const [detents, setDetents] = useState<(SheetDetent)[]>([0.4, 1]);

  const onPositionChange = (event: PositionChangeEvent) => {
    console.log('position', event.nativeEvent.detent);
  };

  const openSheet = async () => {
    setTimeout(() => {
      setDetents([0.5, 1]);
    }, 0);
    await sheetRef.current?.present();
  };

  const onWillDismiss = () => {
    setDetents([0.4, 1]);
  };

  return (
    <View style={styles.container}>
      <Button title="Open Sheet" onPress={openSheet} />

      <TrueSheet ref={sheetRef} detents={detents} onPositionChange={onPositionChange} onWillDismiss={onWillDismiss}>
        <View style={styles.sheetContainer} />
      </TrueSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetContainer: {
    height: 300,
    width: '100%',
    backgroundColor: 'green',
  },
});
