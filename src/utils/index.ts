import i18n from "i18next";

const formatVietnamese = (str: string) => {
  let newStr = str.toLowerCase();
  newStr = newStr.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  newStr = newStr.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  newStr = newStr.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  newStr = newStr.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  newStr = newStr.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  newStr = newStr.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  newStr = newStr.replace(/đ/g, "d");
  return newStr;
};

export const convertToSlug = (text: string) => {
  let newText = text.substring(0, Math.max(80, text.length));
  newText = formatVietnamese(newText);
  return newText;
};

export function translate(key: string) {
  return i18n.t(`common:${key}`);
}
