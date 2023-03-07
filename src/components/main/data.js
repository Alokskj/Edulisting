export const listingQuery = (listingId) =>{
    const query = `*[_type == "listings" && _id == "${listingId}" || title match "${listingId}*" || standard match "${listingId}*" || board match "${listingId}*" || price match "${listingId}*" || locality match "${listingId}*" || city match "${listingId}*" || subject match "${listingId}*" ]{
        _id,
        title,
        description,
        price,
        slug,
        address,
        locality,
        city,
        state,
        userId,
        image{
          asset->{
              _id,
              url
          },
  
        },
        createAt,
      }`
    return query
}
export const userQuery = (userId) =>{
    const query = `*[_type == "user" && _id == "${userId}"]`
    return query
}

export const allListings = () =>{
    const query = `*[_type == "listings" && listed == true ] | order(_createdAt desc){
        _id,
        title,
        description,
        price,
        slug,
        locality,
        city,
        state,
        userId,
        image{
          asset->{
              _id,
              url
          },
  
        },
        createAt,
      }`
      return query
}
export const userListings = (userId) =>{
    const query = `*[_type == "listings" && userId == "${userId}" ] | order(_createdAt desc){
        _id,
        title,
        description,
        price,
        slug,
        locality,
        listed,
        city,
        state,
        userId,
        image{
          asset->{
              _id,
              url
          },
  
        },
        createAt,
      }`
      return query
}

export const deleteListing = (id) =>{
  const query = `*[_type == "listings" && _id == "${userId}" ]`
}
