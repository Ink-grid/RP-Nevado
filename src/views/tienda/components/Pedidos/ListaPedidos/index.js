import React, { Component } from 'react';


import Cart from './Cart';

class CartList extends Component {
  constructor(props) {
    super(props);
  }

  numberFormat(amount, decimals) {
    decimals = decimals || 0;
    if (isNaN(amount) || amount === 0) return parseFloat(0).toFixed(decimals);
    amount = '' + amount.toFixed(decimals);
    var amount_parts = amount.split('.'),
      regexp = /(\d+)(\d{3})/;
    while (regexp.test(amount_parts[0]))
      amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');
    return amount_parts.join('.');
  }

  render() {
    return (
      <div>
        <div>
          <div>
            Lista de pedidos
          </div>
        </div>
        <div style={{ padding: '2em' }}>
          {this.props.items.map(p => {
            return (
              <div style={{ padding: '1em' }}>
                <Cart
                  img={p.img}
                  key={p.cod_producto}
                  name={p.name}
                  order={p.order}
                  total={this.numberFormat(p.total)}
                />
              </div>
            );
          })}
        </div>

          <button
            basic
            color="green"
            compact
            onClick={this.props.onOpenOrder}
            size="medium"
          >
            Proceder al Pago ({this.props.total} productos)
          </button>
        </div>
      
    );
  }
}

export default CartList;