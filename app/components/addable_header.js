import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Icon } from 'react-native-elements'

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#B3D5D6',
    borderColor: '#CCCCCC',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingHorizontal: 15,
    height: 47,
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'Avenir',
    fontSize: 17,
    fontWeight: '300'
  },
  textWrapper: {
    justifyContent: 'center'
  },
  iconWrapper: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    flex: 1
  }
});

const AddableHeader = ({section}) => (
  <View style={styles.header}>
    <View style={styles.textWrapper}>
      <Text style={styles.text}>Wedding Checklist:</Text>
    </View>
    <TouchableOpacity style={styles.iconWrapper}>
      <Icon
        name='add-circle-outline'
        type='material-icons'
      />
    </TouchableOpacity>
  </View>
);

export default AddableHeader;
