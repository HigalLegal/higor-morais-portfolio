import HeadersApi from '../models/headers-api';

export const generateAuthorization = (
    jwt: string | null | undefined,
): HeadersApi => {
    if (!jwt) return {};
    return { Authorization: `Bearer ${jwt}` };
};
