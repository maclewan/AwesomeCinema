import React, {useState} from 'react';
import {Text, View} from 'react-native';

import {Icon} from 'react-native-elements';

const Sit = ({color, size, text}) => {
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
          if (text || myColor === '#F16365') return;
          if (myColor === '#f5bf42') setMyColor('#ccc');
          else setMyColor('#f5bf42');
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
