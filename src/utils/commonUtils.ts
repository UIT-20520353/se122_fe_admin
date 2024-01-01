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

export { uniqueId, isEmptyObject, isTabletPlatForm, isPhonePlatform };
