import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
		backgroundColor: 'black',
		...Platform.select({
			ios: {
				paddingTop: 64
			}
		})
	},
  statusBar: {
    height: 20,
  },
  stocksBlock: {
    flexDirection: 'column',
    flex: 9,
  },
  detailedBlock: {
    height: 248,
    backgroundColor: '#202020',
    justifyContent: 'space-between',
  },
  footerBlock: {
    height: 25,
    flexDirection: 'row',
    backgroundColor: '#202020',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  loadingText: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 10,
    marginRight: 10,
    color: 'white',
  },
  yahoo: {
    flex: 1,
  },
  yahooText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left',
  },
  footerMiddle: {
    flex: 1,
  },
  marketTimeText: {
    fontSize: 12,
    color: '#A6A6A6',
    textAlign: 'center',
  },
  settings: {
    flex: 1,
    alignItems: 'flex-end',
  },
  icon: {
    width: 20,
    height: 20,
  },
  actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
  },
});

export default styles;
