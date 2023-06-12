import { Select, Spin } from "antd";
import React, { useEffect, useState, memo } from "react";
import { useTranslation } from "react-i18next";

import {
  getDictionaryByCode,
  getDictionaryByParentCode,
} from "../../api/dict.api";
import { convertToSlug } from "../../utils";

interface SelectDictProps {
  code?: string;
  parentCode?: string;
  readonly?: boolean;
  onChange: (value: string | string[]) => void;
  canSearch?: boolean;
  value?: string | string[];
  name?: string;
  disabled?: boolean;
}

const SelectDict: React.FC<SelectDictProps> = ({
  code,
  parentCode,
  readonly = false,
  onChange,
  canSearch = true,
  value,
  name,
  disabled,
}) => {
  const { t } = useTranslation("common", { keyPrefix: "common" });
  const [dict, setDict] = useState<any>();
  const [dictValue, setDictValue] = useState<string | string[]>();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    if (code && !parentCode) {
      getDictByCode(code);
    }
    if (parentCode) {
      getDictByParentCode(parentCode);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, code, parentCode]);

  const getDictByCode = (code: string) => {
    setLoading(true);
    getDictionaryByCode(code)
      .then((result: any) => {
        if (result) {
          setDict(result.model);
        }
      })
      .catch((error: any) => error)
      .finally(() => {
        setLoading(false);
      });
  };

  const getDictByParentCode = (codeParams: string) => {
    setLoading(true);
    getDictionaryByParentCode(codeParams)
      .then((result: any) => {
        if (result) {
          setDict(result);
          if (code && parentCode) {
            result?.forEach((res: any) => {
              if (code === res.model.code) {
                setDictValue(code);
              }
            });
          }
        }
      })
      .catch((error: any) => error)
      .finally(() => {
        setLoading(false);
      });
  };

  const filterOption = (input: string, option: any) => {
    return (convertToSlug(option?.label) ?? "")
      .toLowerCase()
      .includes(convertToSlug(input).toLowerCase());
  };

  const handleChange = (newValue: string | string[]) => {
    setDictValue(newValue);
  };

  if (loading) {
    return <Spin />;
  }

  if (readonly && dict) {
    return (
      <>{dict && <span className="inline-block mx-1">{dict.nameVi}</span>}</>
    );
  } else if (readonly && !dict) {
    return <>-</>;
  } else {
    return (
      <>
        {dict && (
          <Select
            className="!w-full"
            showSearch={canSearch}
            placeholder={t("choice")}
            value={dictValue}
            disabled={disabled}
            size="large"
            allowClear
            defaultActiveFirstOption={false}
            showArrow={true}
            filterOption={filterOption}
            onChange={(e) => {
              handleChange(e);
              onChange(e);
            }}
            notFoundContent={null}
            options={(dict || []).map((d: any, index: number) => ({
              value: d.model.code,
              label: d.model.nameVi,
              key: index,
            }))}
          />
        )}
      </>
    );
  }
};

export default memo(SelectDict);
