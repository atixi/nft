import request from "./axios"
export const fetchUsers = async () => {
    return await request(`users`, {
        method: 'GET',
    }).then(res => res)
}