import React, { useState } from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";
import { pageQuery, queryForDeploy } from "../api/merchant.api";
import { getStorageUser } from "../utils/storage.util";
import { CustomUserDetail } from "../models/user.model";

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
      queryForDeploy(null, null).then((response) => {
        if (response) {
          setData(response.data);
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
        label: d.name + "-" + d.address,
      }))}
    />
  );
};
