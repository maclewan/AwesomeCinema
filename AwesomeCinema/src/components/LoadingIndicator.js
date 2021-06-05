import React from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import * as Constants from '../constants';

const LoadingIndicator = ({isLoading}) => {
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;

  return (
    <View style={[styles.container, {width, height}]}>
      <ActivityIndicator size="large" color={Constants.COLORS.red} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    zIndex: 1000,
    backgroundColor: '#000000cc',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingIndicator;
