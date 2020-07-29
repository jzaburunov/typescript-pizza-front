import React from "react";
import { TableCellProps } from "react-virtualized";
import { Field } from "redux-form";

export const nameFormatter: React.FC<TableCellProps> = ({ cellData }) => (
  <span>{cellData}</span>
);

export const subtotalFormatter: React.FC<TableCellProps> = ({ cellData }) => (
  <span>${cellData}</span>
);

// TODO Don't use any
export const renderField = (field: any) => {
  const {
    meta: { touched, error },
  } = field;
  const className = 'form-group';

  const errorClass = touched && error ? ' is-invalid' : '';

  const fieldClass = `field-input form-control
  ${errorClass} ${field.fieldClass ? field.fieldClass : ''}`;

  return (
    <div className={className}>
      {field.label && <label className="field-label">{field.label}</label>}
      <div className="d-flex">
        <div className="w-100">
            <input
              type={field.type}
              className={fieldClass}
              placeholder={field.placeholder}
              readOnly={field.readOnly ? 'readOnly' : ''}
              {...field.input}
            />
        </div>
      </div>
    </div>
  );
};