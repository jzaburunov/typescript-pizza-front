import React, { CSSProperties } from "react";
import { connect } from "react-redux";
import { AutoSizer, Table, Column } from "react-virtualized";
import { StoreState } from "../reducers";
import { CartPizza } from "../reducers/cart";
import { Pizza } from "../actions";
import { Button } from "antd";
import { TableHeaderProps } from "react-virtualized";
import { nameFormatter, subtotalFormatter } from "./utils";

interface CartInterface {
  cart: CartPizza[];
  cartPizzas: Map<string, Pizza | undefined>;
  height: number;
}

interface CartStateInterface {
  rows: CartPizza[];
}

interface TableRowInterface {
  _id: string;
  quantity: number;
  price: number | undefined;
  name: string | undefined;
  subtotal: number;
}

class _Cart extends React.Component<CartInterface, CartStateInterface> {
  constructor(props: CartInterface) {
    super(props);
    const { cart } = props;

    this.state = {
      rows: cart,
    };
  }

  rowGetter = ({ index }: { index: number }): TableRowInterface => {
    const { rows } = this.state;
    const { cartPizzas } = this.props;
    const pizza = rows[index];
    const name = cartPizzas.get(pizza._id)?.name;
    const price = cartPizzas.get(pizza._id)?.price;
    return { ...rows[index], name, price };
  };

  render() {
    const { height } = this.props;
    const { rows } = this.state;

    // TODO Render subtotal
    // TODO Render total

    // const pizzasInCart = cart.map((p) => (
    //   <li key={p._id}>{cartPizzas.get(p._id)?.name}</li>
    // ));

    return (
      <AutoSizer disableHeight>
        {({ width }) => (
          <Table
            headerHeight={50}
            height={1000}
            autoHeight
            // isScrolling={isScrolling}
            // scrollTop={scrollTop}
            rowGetter={this.rowGetter}
            rowHeight={100}
            rowCount={rows.length}
            width={width}
            headerStyle={{
              fontSize: 12,
              fontWeight: 600,
              textTransform: "none",
            }}
            rowStyle={({ index }): CSSProperties => {
              let styles: CSSProperties = {
                fontWeight: "normal",
                borderBottom: "1px solid #e2ebf5",
              };
              return styles;
            }}
            // gridStyle={{
            //   paddingTop: fixHeader ? 50 : 0,
            // }}
          >
            <Column
              label="Pizza"
              dataKey="name"
              cellRenderer={nameFormatter}
              width={240}
              flexGrow={1}
            />
            <Column
              label="Price"
              dataKey="price"
              cellRenderer={nameFormatter}
              width={210}
            />
            <Column
              label="Quantity"
              dataKey="quantity"
              cellRenderer={nameFormatter}
              width={240}
            />
            <Column
              label="Subtotal"
              dataKey="subtotal"
              cellRenderer={subtotalFormatter}
              width={230}
            />
            {/* <Column
                label=""
                dataKey="delete"
                cellRenderer={({ rowData }) => (
                  <Button>Delete</Button>
                  // <GridActionButton
                  //   tooltip="Delete influencer"
                  //   confirmText="Do you really want to delete this influencer?"
                  //   icon="delete"
                  //   onConfirm={() => removeAmbassador(rowData.ambassador._id)}
                  // />
                )}
                width={30}
                disableSort
              /> */}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

function mapStateToProps(state: StoreState) {
  // TODO Use selector to select pizzas from store by _id
  const { cart, pizzas } = state;

  const cartPizzas = cart.reduce((res: Map<string, Pizza>, current) => {
    const found = pizzas.find((i) => i._id === current._id);
    if (found) {
      res.set(current._id, found);
    }
    return res;
  }, new Map<string, Pizza>());
  return {
    cart,
    cartPizzas,
  };
}

export const Cart = connect(mapStateToProps)(_Cart);
