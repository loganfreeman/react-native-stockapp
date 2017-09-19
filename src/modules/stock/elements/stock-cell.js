import React from 'react';
import {
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
} from 'react-native';

const ROTATE_PROPERTIES = {
  Change: 'MarketCapitalization',
  ChangeinPercent: 'Change',
  MarketCapitalization: 'ChangeinPercent',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  selected: {
    backgroundColor: '#202020',
  },
  symbol: {
    flex: 3,
  },
  symbolText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  price: {
    flex: 2,
  },
  priceText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'right',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  changeRed: {
    backgroundColor: '#FC3D39',
    flex: 2,
    padding: 5,
    borderRadius: 3,
  },
  changeGreen: {
    backgroundColor: '#53D769',
    flex: 2,
    padding: 5,
    borderRadius: 3,
  },
  changeText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export default class StockCell extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }


  changeSelectedStock(stock) {

  }

  onStockSelected() {
    this.props.onStockSelected();
  }

  render() {
    const { selectedStock, selectedProperty } = this.props;
    console.log(selectedStock.symbol, this.props.stock.symbol, selectedStock.symbol === this.props.stock.symbol);
    return (
      <TouchableHighlight
        style={[selectedStock.symbol === this.props.stock.symbol ? styles.selected : null]}
        onPress={() => this.onStockSelected()} underlayColor="#202020"
      >
        <View style={[styles.container, selectedStock.symbol === this.props.stock.symbol ? styles.selected : null]}>
          <View style={styles.symbol}>
            <Text style={styles.symbolText}>
              {this.props.stock.symbol}
            </Text>
          </View>
          <View style={styles.price}>
            <Text style={styles.priceText}>
              {this.props.watchlistResult && this.props.watchlistResult[this.props.stock.symbol] && this.props.watchlistResult[this.props.stock.symbol].LastTradePriceOnly}
            </Text>
          </View>
          <TouchableHighlight
            style={(() => {
              switch (this.props.watchlistResult
                      && this.props.watchlistResult[this.props.stock.symbol]
                      && this.props.watchlistResult[this.props.stock.symbol].Change
                      && this.props.watchlistResult[this.props.stock.symbol].Change.startsWith('+')) {
                case true: return styles.changeGreen;
                case false: return styles.changeRed;
                default: return styles.changeGreen;
              }
            })()}
            underlayColor={(() => {
              switch (this.props.watchlistResult
                      && this.props.watchlistResult[this.props.stock.symbol]
                      && this.props.watchlistResult[this.props.stock.symbol].Change
                      && this.props.watchlistResult[this.props.stock.symbol].Change.startsWith('+')) {
                case true: return '#53D769';
                case false: return '#FC3D39';
                default: return '#53D769';
              }
            })()}
            onPress={() => this.selectProperty(ROTATE_PROPERTIES[selectedProperty])}
          >
            <View>
              <Text style={styles.changeText}>
                {(() => {
                  switch (selectedProperty) {
                    case 'Change': return (
                      this.props.watchlistResult
                      && this.props.watchlistResult[this.props.stock.symbol]
                      && this.props.watchlistResult[this.props.stock.symbol].Change) || '--';
                    case 'ChangeinPercent': return (
                      this.props.watchlistResult
                      && this.props.watchlistResult[this.props.stock.symbol]
                      && this.props.watchlistResult[this.props.stock.symbol].ChangeinPercent) || '--';
                    case 'MarketCapitalization': return (
                      this.props.watchlistResult
                      && this.props.watchlistResult[this.props.stock.symbol]
                      && this.props.watchlistResult[this.props.stock.symbol].MarketCapitalization) || '--';
                    default: return (
                      this.props.watchlistResult
                      && this.props.watchlistResult[this.props.stock.symbol]
                      && this.props.watchlistResult[this.props.stock.symbol].Change) || '--';
                  }
                })()}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </TouchableHighlight>
    );
  }
}

StockCell.propTypes = {
  watchlistResult: React.PropTypes.shape({}),
  stock: React.PropTypes.shape({
    symbol: React.PropTypes.string,
  }),
  selectedStock: React.PropTypes.object,
  selectedProperty: React.PropTypes.string,
  onStockSelected: React.PropTypes.func
};

StockCell.defaultProps = {
  watchlistResult: [],
  stock: {},
  selectedStock: {},
  selectedProperty: {}
};
