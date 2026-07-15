export const getCookie = (name) => {
    if (typeof document === "undefined") return null;

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
        return parts.pop().split(";").shift();
    }

    return null;
};

export const decodeJwtPayload = (token) => {
    if (!token) return null;

    try {
        const [, payload] = token.split(".");
        if (!payload) return null;

        const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(atob(normalized));
    } catch {
        return null;
    }
};

export const isJwtExpired = (token) => {
    const payload = decodeJwtPayload(token);
    if (!payload?.exp) return false;

    return Date.now() >= payload.exp * 1000;
};
