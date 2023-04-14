export const listingQuery = (listingId) =>{
    const query = `*[_type == "listings" && _id == "${listingId}" && listed == true || title match "${listingId}*" || standard match "${listingId}*" || board match "${listingId}*" || price match "${listingId}*" || locality match "${listingId}*" || city match "${listingId}*" || subject match "${listingId}*" ]{
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
export const chatQuery = (id) =>{
    const query = `*[_type == "chats" && chatArray != null && userId1 == "${id}" || userId2 == "${id}"]  | order(_updatedAt desc){
      _id,
      userId1,
      userId2,             
      chatArray,
      postedBy->,
      queryedBy->,
      listing->{
        _id,
        title,
        image{
          asset->{
            _id,
            url
          }
        }
      },
      _updatedAt
    }`
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
          ...,
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
export const userPublishedListings = (userId) =>{
    const query = `*[_type == "listings" && userId == "${userId}" && listed == true  ] | order(_createdAt desc){
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


