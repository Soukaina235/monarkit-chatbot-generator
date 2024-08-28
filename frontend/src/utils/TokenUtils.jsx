import { jwtDecode } from "jwt-decode";

export function getCompanyNameFromToken(token) {
    try {
        const decodedToken = jwtDecode(token);
        // Assuming the user ID is stored in the `user_id` or `sub` field of the token payload
        return decodedToken.company_name;
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
}
