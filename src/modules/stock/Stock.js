import React, { PropTypes, Component } from 'react';
import {
	ScrollView,
	TouchableOpacity,
	Linking,
  ListView,
  Platform,
  Text,
  TouchableHighlight,
  StyleSheet,
  View,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Swiper from 'react-native-swiper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';

import * as moviesActions from './stock.actions';
import ProgressBar from '../_global/ProgressBar';
import styles from './styles/Stock';
import { iconsMap } from '../../utils/AppIcons';

const YAHOO_API_URL = "http://download.finance.yahoo.com/d/quotes.csv";

class Stock extends Component {
	constructor(props) {
		super(props);

		this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
      isLoading: true,
      isRefreshing: false,
			watchlistResult: props.watchlistResult,
			selectedProperty: 'ChangeinPercent',
			selectedStock: {},
			key: Math.random(),
    }

		this._onRefresh = this._onRefresh.bind(this);
		this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
	}

	componentDidMount() {
		const symbols = this.props.watchlist.map(item => item.symbol.toUpperCase());
		this.props.actions.handleUpdateStocks(symbols).then(() => {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(this.props.watchlist),
				watchlistResult: this.props.watchlistResult,
				isLoading: false
			});
		})
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ isLoading: false });
	}


	_onRefresh() {
		this.setState({ isRefreshing: true });
	}

	_onNavigatorEvent(event) {
		if (event.type === 'NavBarButtonPress') {
			if (event.id === 'close') {
				this.props.navigator.dismissModal();
			}
		}
	}

	renderDotIndicator() {
    return (
      <PagerDotIndicator pageCount={3} />
    );
  }

	render() {
		const { quote } = this.state;

		return (
			this.state.isLoading ? <View style={styles.progressBar}><ProgressBar /></View> :
			<View style={styles.container}>
        {Platform.OS === 'ios' && <View style={styles.statusBar} />}
        <View style={styles.stocksBlock}>

        </View>
        <View style={styles.detailedBlock}>
          <IndicatorViewPager
            style={{ flex: 1 }}
            indicator={this.renderDotIndicator()}
          >
            <View>

            </View>
            <View>

            </View>
            <View>

            </View>
          </IndicatorViewPager>
        </View>
        <View style={styles.footerBlock}>
          <TouchableHighlight
            style={styles.yahoo}
            onPress={() => Linking.openURL(
              `http://finance.yahoo.com/q?s=${this.state.selectedStock.symbol}`
            )
          }
            underlayColor="#202020"
          >
            <Text style={styles.yahooText}>
              Yahoo!
            </Text>
          </TouchableHighlight>
          <View style={styles.footerMiddle}>
            <Text style={styles.marketTimeText}>
              Market closed
            </Text>
          </View>
          <TouchableHighlight
            style={styles.settings}
            underlayColor="#202020"
          >
            <Icon name="menu" color="white" size={22} />
          </TouchableHighlight>
        </View>
      </View>
		);
	}
}

Stock.propTypes = {
	actions: PropTypes.object.isRequired,
	navigator: PropTypes.object,
	watchlistResult: PropTypes.object.isRequired,
	watchlist: PropTypes.array.isRequired
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

Stock.navigatorStyle = {
	...navigatorStyle,
	statusBarColor: 'black',
	statusBarTextColorScheme: 'light',
	navBarTextColor: 'white',
	navBarButtonColor: 'white'
};

function mapStateToProps(state, ownProps) {
	return {
		watchlistResult: state.stock.watchlistResult,
		watchlist: state.stock.watchlist
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(moviesActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Stock);
