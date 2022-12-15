import React, { useState } from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";
import { pageQuery } from "../api/merchant.api";

export const MerchantSearchInput: React.FC<{
  placeholder: string;
  style: React.CSSProperties;
  onMerchantChange: any;
  merchantId: number;
  disabled: boolean;
}> = (props) => {
  const [data, setData] = useState<SelectProps["options"]>([]);
  const [value, setValue] = useState<number>();

  const handleSearch = (newValue: string) => {
    if (newValue) {
      pageQuery(1, 10, true, newValue).then((response) => {
        if (response) {
          setData(response.data.result.rows);
        }
      });
    } else {
      setData([]);
    }
  };

  const handleChange = (newValue: number) => {
    setValue(newValue);
    props.onMerchantChange(newValue);
  };

  return (
    <Select
      disabled={props.disabled}
      size="large"
      showSearch
      value={value}
      defaultValue={value}
      placeholder={props.placeholder}
      style={props.style}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
      options={(data || []).map((d) => ({
        value: d.id,
        label: d.name,
      }))}
    />
  );
};
