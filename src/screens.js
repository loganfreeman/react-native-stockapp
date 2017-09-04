/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';

import Drawer from './modules/_global/Drawer';
import Stock from './modules/stock/Stock';

export function registerScreens(store, Provider) {
	Navigation.registerComponent('movieapp.Stock', () => Stock, store, Provider);
	Navigation.registerComponent('movieapp.Drawer', () => Drawer);
}
