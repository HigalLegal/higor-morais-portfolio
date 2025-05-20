type DecodedToken = {
    upn: string;
    groups: string[];
    iat: number;
    exp: number;
};

export default DecodedToken;
