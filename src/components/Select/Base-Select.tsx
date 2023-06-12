import { Divider, Pagination, Select, Spin } from "antd";
import { useTranslation } from "react-i18next";

interface BaseSelectComponentProps {
  read: boolean;
  clear?: boolean;
  data: any;
  pageRequest: any;
  isLoading: boolean;
  disabled?: boolean;
  onSearch: (value: string) => void;
  onChangeSelect: (value: string) => void;
  getOptionValue: (result: any) => string;
  getOptionLabel: (result: any) => string;
  getDataReadonly: (data: any) => React.ReactNode;
  onChangePagination: (page: number, pageSize: number) => void;
  value: string | undefined;
}

const BaseSelectComponent: React.FC<BaseSelectComponentProps> = ({
  read,
  clear = true,
  data,
  pageRequest,
  isLoading,
  disabled = false,
  onSearch,
  onChangeSelect,
  getOptionValue,
  getOptionLabel,
  getDataReadonly,
  onChangePagination,
  value,
}) => {
  const { t } = useTranslation("locale", { keyPrefix: "common" });
  if (isLoading) {
    return <Spin />;
  }
  if (read && data) {
    return (
      <>
        {data && (
          <span className="inline-block mx-1">{getDataReadonly(data)}</span>
        )}
      </>
    );
  } else if (read && !data) {
    return <>-</>;
  } else {
    return (
      <>
        {data && (
          <Select
            className="!w-full m-auto base-select"
            showSearch
            value={value}
            allowClear={clear}
            dropdownRender={(menu) => (
              <>
                {menu}
                {data && data.rows && data.total && (
                  <>
                    <Divider className="!my-2" />
                    <Pagination
                      className="m-2"
                      current={pageRequest.pageIndex}
                      pageSize={pageRequest.pageSize}
                      size="small"
                      total={data.total}
                      showTotal={(total) => `Total ${total} items`}
                      onChange={(page, pageSize) =>
                        onChangePagination(page, pageSize)
                      }
                    />
                  </>
                )}
              </>
            )}
            options={(data.rows || []).map((result: any) => ({
              value: getOptionValue(result),
              label: getOptionLabel(result),
            }))}
            placeholder={t("choice")}
            filterOption={false}
            onSearch={onSearch}
            onChange={onChangeSelect}
            loading={isLoading}
            disabled={disabled}
          />
        )}
      </>
    );
  }
};

export default BaseSelectComponent;
