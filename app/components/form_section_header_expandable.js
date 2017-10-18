import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#B3D5D6',
    borderColor: '#CCCCCC',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  text: {
    fontFamily: 'Avenir',
    fontWeight: '300'
  }
});

// const FormSectionHeaderExpandable = ({section}) => (
//   <View style={styles.header}>
//     <Text style={styles.text}>{section.title}</Text>
//     <TouchableOpacity
//       style={{width: 25, height: 25}}
//       onPress={ (() => { console.log(this) }).bind(this) }
//       >
//       <Text>Expand</Text>
//     </TouchableOpacity>
//   </View>
// );

class FormSectionHeaderExpandable extends Component {
  constructor(props) {
    super(props);
  }

  toggleSection = () => {
    this.props.toggleSection(this.props.section);
  }

  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.text}>{this.props.section.title}</Text>
        <TouchableOpacity
          style={{width: 25, height: 25}}
          onPress={this.toggleSection}
          >
          <Text>Expand</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default FormSectionHeaderExpandable;
