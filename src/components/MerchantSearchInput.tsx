import React, { useState } from "react";
import { Divider, Select } from "antd";
import type { SelectProps } from "antd";
import { pageQuery, queryForDeploy } from "../api/merchant.api";
import { getStorageUser } from "../utils/storage.util";
import { CustomUserDetail } from "../models/user.model";
const { Option } = Select;

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
      queryForDeploy(null, null, 1, 10).then((response) => {
        if (response) {
          setData(response.data.result);
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
      listHeight={256}
      dropdownMatchSelectWidth={true}
      optionLabelProp="label"
    >
      {(data || []).map((d) => (
        <Select.Option value={d.id} label={d.name + " - \n" + d.address}>
          <div>{d.name}</div>
          <div
            style={{
              inlineSize: "100px",
              overflowWrap: "break-word",
            }}
          >
            {d.address}
          </div>
        </Select.Option>
      ))}
    </Select>
  );
};
