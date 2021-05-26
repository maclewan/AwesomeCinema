import React, {useState} from 'react';
import {Text, View} from 'react-native';

import {Icon} from 'react-native-elements';

import {COLORS} from '../constants';

const Sit = ({color, size, text, addToSelectedSits, rmFromSelectedSits}) => {
  const [myColor, setMyColor] = useState(color);

  return (
    <View>
      <Icon
        name="circle"
        type="MaterialIcons"
        color={myColor}
        size={size}
        iconStyle={{margin: 2}}
        onPress={() => {
          if (text || myColor === COLORS.red) return;
          if (myColor === COLORS.yellow) {
            setMyColor(COLORS.grey);
            rmFromSelectedSits();
          } else {
            setMyColor(COLORS.yellow);
            addToSelectedSits();
          }
          console.log(myColor);
          // else change color from green to grey / from grey to green
        }}
      />
      {text && (
        <Text style={{fontSize: 18, color: '#333', fontWeight: 'bold'}}>
          {text}
        </Text>
      )}
    </View>
  );
};

export default Sit;
