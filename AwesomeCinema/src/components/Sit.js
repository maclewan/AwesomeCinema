import React from 'react';
import {Text, View} from 'react-native';

import {Icon} from 'react-native-elements';

const Sit = ({color, size, text}) => (
  <View>
    <Icon
      name="square"
      type="Ionicons"
      color={color}
      size={size}
      onPress={() => {
        // if color === red return
        // else change color from green to grey / from grey to green
      }}
    />
    {text && <Text style={{fontSize: 18, color: '#333'}}>{text}</Text>}
  </View>
);

export default Sit;
