import { useRef } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export default function App() {
  const viewExitingRef = useRef<TrueSheet>(null);
  const footerExitingRef = useRef<TrueSheet>(null);
  const viewEnteringRef = useRef<TrueSheet>(null);
  const footerEnteringRef = useRef<TrueSheet>(null);
  const regularSheetRef = useRef<TrueSheet>(null);

  const openSheet = async () => await viewExitingRef.current?.present();
  const openSheetWithAnimatedFooter = async () =>  await footerExitingRef.current?.present();
  const openSheetWithViewEnteringAnimation = async () => await viewEnteringRef.current?.present();
  const openSheetWithFooterEnteringAnimation = async () => await footerEnteringRef.current?.present();
  const openRegularSheet = async () => await regularSheetRef.current?.present();

  return (
    <View style={styles.container}>
      <Button title="Sheet - view exiting animation" onPress={openSheet} />
      <Button title="Sheet - footer exiting animation" onPress={openSheetWithAnimatedFooter} />
      <Button title="Sheet - view entering animation" onPress={openSheetWithViewEnteringAnimation} />
      <Button title="Sheet - footer entering animation" onPress={openSheetWithFooterEnteringAnimation} />
      <Button title="Sheet - regular" onPress={openRegularSheet} />

      {/* Sheet with view exiting animation */}
      <TrueSheet ref={viewExitingRef} detents={['auto']}>
        <View style={styles.sheetContainer}>
          <Animated.View exiting={FadeIn} style={styles.animatedViewContainer} />
        </View>
      </TrueSheet>

       {/* Sheet with footer exiting animation */}
       <TrueSheet ref={footerExitingRef} detents={['auto']} footer={<FooterWithExitAnimation />}>
        <View style={styles.sheetContainer} />
      </TrueSheet>

      {/* Sheet with view entering animation */}
      <TrueSheet ref={viewEnteringRef} detents={['auto']} footer={<FooterWithoutAnimation />}>
        <View style={styles.sheetContainer}>
          <Animated.View entering={FadeIn} style={styles.animatedViewContainer} />
        </View>
      </TrueSheet>

      {/* Sheet with footer entering animation */}
      <TrueSheet ref={footerEnteringRef} detents={['auto']} footer={<FooterWithEnteringAnimation />}>
        <View style={styles.sheetContainer} />
      </TrueSheet>

      {/* Sheet without any animations */}
      <TrueSheet ref={regularSheetRef} detents={['auto']} footer={<FooterWithoutAnimation />}>
        <View style={styles.sheetContainer} />
      </TrueSheet>
    </View>
  );
}

function FooterWithEnteringAnimation() {
  return (
    <View style={styles.footerContainer}><Animated.View entering={FadeIn} style={styles.animatedViewContainer} /></View>
  );
}

function FooterWithExitAnimation() {
  return (
    <View style={styles.footerContainer}><Animated.View exiting={FadeOut} style={styles.animatedViewContainer} /></View>
  );
}

function FooterWithoutAnimation() {
  return (
    <View style={styles.footerContainer} />
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
  footerContainer: {
    height: 100,
    width: '100%',
    backgroundColor: 'blue',
  },
  animatedViewContainer: {
    height: 100,
    width: '100%',
    backgroundColor: 'red',
  },
});
