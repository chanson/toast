import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#B3D5D6',
    borderColor: '#CCCCCC',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingHorizontal: 15,
    height: 47,
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Avenir',
    fontSize: 17,
    fontWeight: '300'
  }
});

const ExpandableHeader = ({section}) => (
  <View style={styles.header}>
    <Text style={styles.text}>{section.title}</Text>
  </View>
);

export default ExpandableHeader;
