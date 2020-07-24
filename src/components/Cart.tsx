import React, { CSSProperties } from "react";
import { connect } from "react-redux";
import { AutoSizer, Table, Column } from "react-virtualized";
import { StoreState } from "../reducers";
import { CartPizza } from "../reducers/cart";
import { Pizza } from "../actions";
import { Button } from "antd";
import { TableHeaderProps } from "react-virtualized";
import { nameFormatter } from "./utils";

interface CartInterface {
  cart: CartPizza[];
  cartPizzas: Map<string, Pizza | undefined>;
  height: number;
}

interface CartStateInterface {
  rows: CartPizza[];
}

class _Cart extends React.Component<CartInterface, CartStateInterface> {
  constructor(props: CartInterface) {
    super(props);
    const { cart } = props;

    this.state = {
      rows: cart,
    };
  }

  headerRenderer = ({ label }: TableHeaderProps) => <div>{label}</div>;

  rowGetter = ({ index }: { index: number }): CartPizza => {
    const { rows } = this.state;
    return rows[index];
  };

  render() {
    const { height } = this.props;
    const { rows } = this.state;
    // TODO Render a list pizzas
    // const pizzasInCart = cart.map((p) => (
    //   <li key={p._id}>{cartPizzas.get(p._id)?.name}</li>
    // ));

    return (
      <AutoSizer disableHeight>
        {({ width }) => (
          <Table
            headerHeight={150}
            height={1000}
            autoHeight
            // isScrolling={isScrolling}
            // scrollTop={scrollTop}
            rowGetter={this.rowGetter}
            rowHeight={100}
            rowCount={rows.length}
            width={width}
            className="ambassadors-grid"
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
              // if (index < 0) {
              //   styles = {
              //     ...styles,
              //     position: fixHeader ? "fixed" : "static",
              //     backgroundColor: "#fff",
              //     zIndex: 10,
              //     top: 0,
              //   };
              // }
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
              // headerRenderer={this.headerRenderer}
              flexGrow={1}
            />
            <Column
              label="Price"
              dataKey="price"
              cellRenderer={nameFormatter}
              width={210}
              // // headerRenderer={this.headerRenderer}
            />
            <Column
              label="Quantity"
              dataKey="quantity"
              cellRenderer={nameFormatter}
              width={240}
              // headerRenderer={this.headerRenderer}
            />
            {/* <Column
                label="Subtotal"
                dataKey="subtotal"
                cellRenderer={LeadStatusFormatter}
                width={230}
                headerRenderer={this.headerRenderer}
              /> */}
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
