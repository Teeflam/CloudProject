import * as CryptoJS from 'crypto-js';

export const hash = (value: string): string => {
    return CryptoJS.SHA1(value).toString(CryptoJS.enc.Base64);
};
