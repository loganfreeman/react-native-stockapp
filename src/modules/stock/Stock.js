import React, { PropTypes, Component } from 'react';
import {
	RefreshControl,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
	Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as moviesActions from './stock.actions';
import ProgressBar from '../_global/ProgressBar';
import styles from './styles/Stock';
import { iconsMap } from '../../utils/AppIcons';

const YAHOO_API_URL = "http://download.finance.yahoo.com/d/quotes.csv";

class Stock extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			isRefreshing: false
		};

		this._onRefresh = this._onRefresh.bind(this);
		this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
	}

	componentDidMount() {
		const { watchlist } = this.props;
		this.props.actions.handleUpdateStocks(watchlist);
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

	render() {
		const { quote } = this.state;

		return (
			this.state.isLoading ? <View style={styles.progressBar}><ProgressBar /></View> :
			<ScrollView
				style={styles.container}
				refreshControl={
					<RefreshControl
						refreshing={this.state.isRefreshing}
						onRefresh={this._onRefresh}
						colors={['#EA0000']}
						tintColor="white"
						title="loading..."
						titleColor="white"
						progressBackgroundColor="white"
					/>
				}>
				<Text>
					{quote}
				</Text>
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
		watchlist: state.stock.watchlist
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(moviesActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Stock);
