import React, { CSSProperties } from "react";
import { AutoSizer, Table, Column } from "react-virtualized";
import { nameFormatter, subtotalFormatter } from "./utils";

export interface TableRowInterface {
  _id: string;
  quantity: number;
  price: number | undefined;
  name: string | undefined;
  subtotal: number;
}

interface CartGridInterface extends React.HTMLAttributes<HTMLDivElement> {
  rowGetter({ index }: { index: number }): TableRowInterface;
  length: number;
}

export const CartGrid: React.FC<CartGridInterface> = (props) => {
  const { rowGetter, length } = props;

  return (
    <AutoSizer disableHeight>
      {({ width }) => (
        <Table
          headerHeight={50}
          height={1000}
          autoHeight
          rowGetter={rowGetter}
          rowHeight={100}
          rowCount={length}
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
};
