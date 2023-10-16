import { useState } from "react";
import { useListing } from "../Contexts/ListingContext";
import Create from "./Create";
import { useEffect } from "react";
import Spinner from "../header/Spinner";
import { UserSingleListingQuery } from "../main/data";
import { client } from "../main/client";

const EditListing = () => {
    const {listingId, setListing, setImage, resetListing} = useListing()
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
     const getListing = async () =>{
        const query = UserSingleListingQuery(listingId)
        const result = await client.fetch(query)
        setListing(result[0])
        // const {url, _id} = result[0].image.asset
        console.log(result[0])
        setImage(result[0].image)
        
        setLoading(false)
     }
     getListing()
     return () => resetListing()
    },[listingId])
    if(loading) return <Spinner />
    return ( 
        <Create />
     );
}
 
export default EditListing;