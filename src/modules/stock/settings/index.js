import React, { PropTypes } from 'react';
import {
  ListView,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

// 3rd party libraries
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/MaterialIcons';

// actions
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as moviesActions from '../stock.actions';

// View Elements
import StockCell from './elements/stock-cell';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  navigatorBarIOS: {
    backgroundColor: '#202020',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#424242',
  },
  navigatorLeftButton: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 50,
  },
  navigatorRightButton: {
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 10,
  },
  toolbar: {
    height: 56,
    backgroundColor: '#202020',
  },
  topBlock: {
    flex: 1,
  },
  bottomBlock: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30,
  },
  buttonLeft: {
    height: 36,
    borderColor: '#3CABDA',
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    justifyContent: 'center',
  },
  buttonMiddle: {
    height: 36,
    borderColor: '#3CABDA',
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    justifyContent: 'center',
  },
  buttonRight: {
    height: 36,
    borderColor: '#3CABDA',
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    justifyContent: 'center',
  },
  buttonSelected: {
    backgroundColor: '#3CABDA',
  },
  buttonText: {
    fontSize: 14,
    color: '#3CABDA',
    alignSelf: 'center',
  },
  buttonTextSelected: {
    color: 'black',
  },
});

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
      key: Math.random(),
    };

    this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
  }

  onCancelButtonPress() {
    this.props.navigator.dismissModal();
  }

  _onNavigatorEvent(event) {
		if (event.type === 'NavBarButtonPress') {
			if (event.id === 'close') {
				this.props.navigator.dismissModal();
			}
		}
	}

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.watchlist),
      watchlistResult: this.props.watchlistResult,
      selectedProperty: this.props.selectedProperty,
      key: Math.random(),
    });
  }

  componentWillUnmount() {
  }


  selectProperty(property) {

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topBlock}>
          <ListView
            key={this.state.key}
            dataSource={this.state.dataSource}
            renderRow={stock => <StockCell stock={stock} watchlistResult={this.state.watchlistResult} />}
          />
        </View>
        <View style={styles.bottomBlock}>
          <TouchableHighlight
            style={[styles.buttonLeft, this.state.selectedProperty === 'ChangeinPercent' ? styles.buttonSelected : null]}
            underlayColor="#66CCFF"
            onPress={() => this.selectProperty('ChangeinPercent')}
          >
            <Text style={[styles.buttonText, this.state.selectedProperty === 'ChangeinPercent' ? styles.buttonTextSelected : null]}>
              percentage
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.buttonMiddle, this.state.selectedProperty === 'Change' ? styles.buttonSelected : null]}
            underlayColor="#66CCFF"
            onPress={() => this.selectProperty('Change')}
          >
            <Text style={[styles.buttonText, this.state.selectedProperty === 'Change' ? styles.buttonTextSelected : null]}>
              price
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.buttonRight, this.state.selectedProperty === 'MarketCapitalization' ? styles.buttonSelected : null]}
            underlayColor="#66CCFF"
            onPress={() => this.selectProperty('MarketCapitalization')}
          >
            <Text style={[styles.buttonText, this.state.selectedProperty === 'MarketCapitalization' ? styles.buttonTextSelected : null]}>
              market cap
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

Settings.propTypes = {
  title: React.PropTypes.string,
  actions: PropTypes.object.isRequired,
  navigator: PropTypes.object,
  watchlistResult: PropTypes.object.isRequired,
  watchlist: PropTypes.array.isRequired,
  selectedProperty: PropTypes.string.isRequired
};

Settings.defaultProps = {
  title: '',
};

let navigatorStyle = {};

if (Platform.OS === 'ios') {
	navigatorStyle = {
		navBarTranslucent: true,
		drawUnderNavBar: true
	};
} else {
	navigatorStyle = {
		navBarBackgroundColor: '#0a0a0a'
	};
}

Settings.navigatorStyle = {
	...navigatorStyle,
	statusBarColor: 'black',
	statusBarTextColorScheme: 'light',
	navBarTextColor: 'white',
	navBarButtonColor: 'white'
};

function mapStateToProps(state, ownProps) {
	return {
    watchlistResult: state.stock.watchlistResult,
		watchlist: state.stock.watchlist,
    selectedProperty: state.stock.selectedProperty
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(moviesActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
