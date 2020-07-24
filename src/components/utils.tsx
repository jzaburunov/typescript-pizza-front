import React from "react";
import { TableCellProps } from "react-virtualized";

export const nameFormatter: React.FC<TableCellProps> = ({ cellData }) => (
  <span>{cellData}</span>
);
