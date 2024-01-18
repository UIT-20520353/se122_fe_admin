import { v4 as uuid } from "uuid";
import { PlatformStateInterface } from "../redux/platformSlice";

const uniqueId = (): string => Date.now().toString(36) + uuid();

const isEmptyObject = (obj: object): boolean =>
  !obj ||
  (Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype);

const isTabletPlatForm = (platform: PlatformStateInterface): boolean =>
  platform.isTablet || platform.isSmallTablet || platform.isMediumTablet;

const isPhonePlatform = (platform: PlatformStateInterface): boolean =>
  platform.isPhone || platform.isSmallPhone;

export const formatDate = (value: string) => {
  if (!value) return "--";

  const date = new Date(value);
  let format = "HH:mm:ss DD-MM-YYYY";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  format = format.replace("YYYY", year.toString());
  format = format.replace("MM", month);
  format = format.replace("DD", day);
  format = format.replace("HH", hours);
  format = format.replace("mm", minutes);
  format = format.replace("ss", seconds);

  return format;
};

export { uniqueId, isEmptyObject, isTabletPlatForm, isPhonePlatform };
