import { Input, Modal, Pagination, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { queryForDeploy } from "../api/merchant.api";

const { Search } = Input;

export interface DataType {
  id: number;
  key: React.Key;
  name: string;
  address: number;
  longLat: string;
  totalRow?: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Longitude \\ Latitude",
    dataIndex: "longLat",
  },
];

export const Merchant: FC<{
  open: boolean;
  handleOk: any;
  handleCancel: any;
  handleSelectMerchant: any;
  pNumber: number;
  pSize: number;
}> = (props) => {
  const { t } = useTranslation("common", { keyPrefix: "merchant" });
  const [data, setData] = useState<any[]>([]);
  const [merchants, setMerchants] = useState<any[]>([]);
  const [pageNumber, setPageNumber] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [columns, setColumns] = useState<ColumnsType<DataType>>([]);

  React.useEffect(() => {
    setColumns([
      {
        title: t("id"),
        dataIndex: "id",
      },
      {
        title: t("name"),
        dataIndex: "name",
      },
      {
        title: t("address"),
        dataIndex: "address",
      },
      {
        title: "Longitude \\ Latitude",
        dataIndex: "longLat",
      },
    ]);
  }, [t]);

  React.useEffect(() => {
    setLoading(true);
    setPageNumber(props.pNumber);
    queryForDeploy(null, "", props.pNumber, props.pSize).then(
      (response: any) => {
        if (response) {
          setData(
            response?.map((d: any, index: number) => {
              return {
                id: d.id,
                key: index,
                name: d.name,
                address: d.address,
                longLat: `${d.longitude} \\ ${d.latitude}`,
                totalRow: d.totalRow,
              };
            })
          );
          setLoading(false);
        } else {
          setData([]);
          setLoading(false);
        }
      }
    );
  }, [props.pNumber, props.pSize]);

  const onSelectMerchant = (
    record: any,
    selected: any,
    selectedRows: any,
    nativeEvent: any
  ) => {
    setMerchants(selectedRows);
    props.handleSelectMerchant(selectedRows);
    setMerchants([]);
  };

  return (
    <Modal
      title={t("title")}
      open={props.open}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      okButtonProps={{ disabled: true }}
      cancelButtonProps={{ disabled: true }}
      footer={null}
    >
      <Search
        placeholder={t("search").toString()}
        onSearch={(searchValue: string) => {
          setLoading(true);
          queryForDeploy(null, searchValue, props.pNumber, props.pSize).then(
            (response: any) => {
              if (response) {
                setData(
                  response.map((d: any, index: number) => {
                    return {
                      id: d.id,
                      key: index,
                      name: d.name,
                      address: d.address,
                      longLat: `${d.longitude} \\ ${d.latitude}`,
                      totalRow: d.totalRow,
                    };
                  })
                );
                setLoading(false);
              } else {
                setData([]);
                setLoading(false);
              }
            }
          );
        }}
        enterButton
      />
      <Table
        columns={columns}
        dataSource={(data || []).map((d) => d)}
        size="small"
        pagination={false}
        loading={loading}
        rowSelection={{
          type: "radio",
          hideSelectAll: true,
          onSelect: onSelectMerchant,
          selectedRowKeys: merchants,
        }}
      />
      <Pagination
        size="small"
        //   onShowSizeChange={onShowSizeChange}
        defaultCurrent={pageNumber}
        defaultPageSize={props.pSize}
        current={pageNumber}
        pageSize={props.pSize}
        total={data[0] ? Number(data[0].totalRow) : data.length}
        onChange={(page, pageSize) => {
          setLoading(true);
          setPageNumber(page);
          queryForDeploy(null, "", page, props.pSize).then((response: any) => {
            if (response) {
              setData(
                response.map((d: any, index: number) => {
                  return {
                    id: d.id,
                    key: index,
                    name: d.name,
                    address: d.address,
                    longLat: `${d.longitude} \\ ${d.latitude}`,
                    totalRow: d.totalRow,
                  };
                })
              );
              setLoading(false);
            } else {
              setData([]);
              setLoading(false);
            }
          });
        }}
      />
    </Modal>
  );
};
