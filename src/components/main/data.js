export const listingQuery = (listingId) =>{
    const query = `*[_type == "listing" && _id == "${listingId}"]`
    return query
}
export const userQuery = (userId) =>{
    const query = `*[_type == "user" && _id == "${userId}"]`
    return query
}