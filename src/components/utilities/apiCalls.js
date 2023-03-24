import { client } from "../main/client"

export const followersAdd = (userId, followingId) =>{
    client.patch(userId)
    .setIfMissing({ following: []})
    .insert("after", "following[-1]", [{_ref : followingId, _type: "reference"}])
    .commit({ autoGenerateArrayKeys: true })
}

export const followersRemove = (userId, followingId) => {
  client.patch(userId)
  .unset([`following[_ref=="${followingId}"]`])
  .commit()
}

