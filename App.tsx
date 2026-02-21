import { useRef } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { ReanimatedTrueSheet, ReanimatedTrueSheetProvider, useReanimatedTrueSheet } from '@lodev09/react-native-true-sheet/reanimated';
import Animated, { clamp, useAnimatedReaction, useAnimatedStyle } from 'react-native-reanimated';

export default function App() {
  return (
    <ReanimatedTrueSheetProvider>
      <Comp />
    </ReanimatedTrueSheetProvider>
  );
}

const Comp = () => {
  const sheetRef = useRef<TrueSheet>(null);
  const { animatedIndex } = useReanimatedTrueSheet()

  useAnimatedReaction(() => animatedIndex.value, (value) => console.log(value))

  const openSheet = async () => {
    sheetRef.current?.present();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: clamp(animatedIndex.value, 0, 1)
  }));

  return (
    <View style={styles.container}>
      <Button title="Open Sheet" onPress={openSheet} />
      <ReanimatedTrueSheet ref={sheetRef} detents={[0.4, 1]}>
        <Animated.View style={[styles.sheetContainer, animatedStyle]} />
      </ReanimatedTrueSheet>
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
