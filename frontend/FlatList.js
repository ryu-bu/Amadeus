import {Component} from 'react';

export default class FlatListItem extends Component {
    state = { showItemIndex: [false, false] };
  
    _onPress = index => () => {
      let showItemIndex = this.state.showItemIndex;
      showItemIndex[index] = !this.state.showItemIndex[index];
      this.setState({ showItemIndex });
    };
  
    render() {
      return (
        <View style={styles.list}>
          <View>
            <TouchableOpacity onPress={this._onPress(this.props.index)}>
              <Text style={styles.itemTitle}>{this.props.item.title}</Text>
            </TouchableOpacity>
            {this.state.showItemIndex[this.props.index] && (
              <FlatList
                data={this.props.item.mood}
                extraData={this.state.showItemIndex}
                renderItem={({ item, index }) => {
                  return (
                    <Text item={item} index={index}>
                      {item.name}
                    </Text>
                  );
                }}
              />
            )}
          </View>
        </View>
      );
    }
  }