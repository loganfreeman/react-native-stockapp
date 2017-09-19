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
import ActionButton from 'react-native-action-button';

import * as moviesActions from './stock.actions';
import ProgressBar from '../_global/ProgressBar';
import styles from './styles/Stock';
import { iconsMap } from '../../utils/AppIcons';

// View Elements
import ChartPage from './elements/chart-page';
import DetailsPage from './elements/details-page';
import NewsPage from './elements/news-page';
import StockCell from './elements/stock-cell';


class Stock extends Component {
	constructor(props) {
		super(props);
		const { watchlist, watchlistResult, selectedStock, selectedProperty } = props;
		this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
      isLoading: true,
      isRefreshing: false,
			watchlistResult,
			selectedProperty,
			selectedStock,
			key: Math.random(),
    }

		this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
	}

	componentDidMount() {
		const symbols = this.props.watchlist.map(item => item.symbol.toUpperCase());
		this.props.actions.handleUpdateStocks(symbols).then(() => {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(this.props.watchlist),
				watchlistResult: this.props.watchlistResult,
				isLoading: false,
				isRefreshing: false
			});
		})
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.watchlist.length > 0) {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(nextProps.watchlist),
				watchlistResult: nextProps.watchlistResult,
				isLoading: false,
				isRefreshing: false
			});
		}
	}


	onRefresh() {
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

	onStockSelected(selectedStock) {
		this.setState({
			selectedStock
		})
	}

	handleSelectProperty(selectedProperty) {
		this.setState({
			selectedProperty
		})
	}

	addStock() {
		this.props.navigator.showModal({
			screen: 'movieapp.AddStock',
			title: 'Add Stock',
			animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
  		animationType: 'fade'
		});
	}

	render() {
		const { quote } = this.state;

		return (
			this.state.isLoading ? <View style={styles.progressBar}><ProgressBar /></View> :
			<ScrollView
				style={styles.container}>
        {Platform.OS === 'ios' && <View style={styles.statusBar} />}
				<View style={styles.stocksBlock}>
					<ListView
						key={this.state.key}
						refreshControl={
							<RefreshControl
								refreshing={this.state.isRefreshing}
								onRefresh={() => this.onRefresh()}
							/>
						}
						dataSource={this.state.dataSource}
						renderRow={stock => <StockCell stock={stock} handleSelectProperty={this.handleSelectProperty.bind(this)} onStockSelected={this.onStockSelected.bind(this, stock)} watchlistResult={this.state.watchlistResult} selectedStock={this.state.selectedStock} selectedProperty={this.state.selectedProperty}/>}
					/>
				</View>

				<View style={styles.detailedBlock}>
					<IndicatorViewPager
						style={{flex: 1}}
						indicator={this.renderDotIndicator()}
					>
						<View>
							<DetailsPage stock={this.state.selectedStock} watchlistResult={this.state.watchlistResult} />
						</View>
						<View>
							<ChartPage stock={this.state.selectedStock} />
						</View>
						<View>
							<NewsPage key={this.state.key} stock={this.state.selectedStock} />
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

				<ActionButton buttonColor="rgba(231,76,60,1)">
	        <ActionButton.Item buttonColor='#9b59b6' title="Add stock" onPress={() => this.addStock()}>
	          <Icon name="add" style={styles.actionButtonIcon} />
	        </ActionButton.Item>
	      </ActionButton>
      </ScrollView>
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
		watchlist: state.stock.watchlist,
		selectedStock: state.stock.selectedStock,
		selectedProperty: state.stock.selectedProperty,
		addedStock: state.stock.addedStock
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(moviesActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Stock);
