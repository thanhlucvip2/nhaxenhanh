const storagePrefix = "nhaxenhanh";

const getCookie = (name: string): string | null => {
  const cname = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(cname) === 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return null;
};

const setCookie = (name: string, value: string): void => {
  document.cookie = name + "=" + value + ";;path=/";
};

const removeCookie = (name: string): void => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

const cookie = {
  getToken: () => {
    return JSON.parse(getCookie(`${storagePrefix}token`) as string);
  },
  setToken: (token: string) => {
    setCookie(`${storagePrefix}token`, JSON.stringify(token));
  },
  clearToken: () => {
    removeCookie(`${storagePrefix}token`);
  },
};

export default cookie;
