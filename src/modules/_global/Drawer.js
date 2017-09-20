import React, { Component, PropTypes } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	ToastAndroid,
	Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles/Drawer';

class Drawer extends Component {
	constructor(props) {
		super(props);

		this._goToMovies = this._goToMovies.bind(this);
		this._goToSettings = this._goToSettings.bind(this);
		this._goToAddStock = this._goToAddStock.bind(this);
	}



	_goToMovies() {
		this._toggleDrawer();
		this.props.navigator.showModal({
			screen: 'movieapp.Stock',
			title: 'Stock',
			animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
  		animationType: 'fade'
		});
	}

	_goToSettings() {
		this._toggleDrawer();
		this.props.navigator.showModal({
			screen: 'movieapp.Settings',
			title: 'Settings',
			animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
			animationType: 'fade'
		});
	}

	_goToAddStock() {
		this._toggleDrawer();
		this.props.navigator.showModal({
			screen: 'movieapp.AddStock',
			title: 'Add Stock',
			animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
			animationType: 'fade'
		});
	}

	_toggleDrawer() {
		this.props.navigator.toggleDrawer({
			to: 'closed',
			side: 'left',
			animated: true
		});
	}


	render() {
		const iconMovies = (<Icon name="notifications" size={26} color="#9F9F9F" style={[styles.drawerListIcon, { paddingLeft: 3 }]} />);
		const iconSettings = (<Icon name="settings" size={26} color="#9F9F9F" style={[styles.drawerListIcon, { paddingLeft: 3 }]} />);
		const iconAdd = (<Icon name="add" size={26} color="#9F9F9F" style={[styles.drawerListIcon, { paddingLeft: 3 }]} />);
		return (
			<LinearGradient colors={['rgba(0, 0, 0, 0.7)', 'rgba(0,0,0, 0.9)', 'rgba(0,0,0, 1)']} style={styles.linearGradient}>
				<View style={styles.container}>
					<View style={styles.drawerList}>
						<TouchableOpacity onPress={this._goToMovies}>
							<View style={styles.drawerListItem}>
								{iconMovies}
								<Text style={styles.drawerListItemText}>
									Stock
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={this._goToSettings}>
							<View style={styles.drawerListItem}>
								{iconSettings}
								<Text style={styles.drawerListItemText}>
									Settings
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={this._goToAddStock}>
							<View style={styles.drawerListItem}>
								{iconAdd}
								<Text style={styles.drawerListItemText}>
									Add Stock
								</Text>
							</View>
						</TouchableOpacity>
					</View>
					<Text style={styles._version}>
						{/* 'v1.0.0' */}
					</Text>
				</View>
			</LinearGradient>
		);
	}
}

Drawer.propTypes = {
	navigator: PropTypes.object
};

export default Drawer;
