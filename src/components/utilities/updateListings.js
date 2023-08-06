import { client } from "../main/client";
import { allListings } from "../main/data";
import getUserLatLng from "./getUserLatLng";

export default async function updateListings() {
  try {
    const query = allListings();
    const response = await client.fetch(query);

    const updatedResponse = await Promise.all(
      response.map(async (item) => {
        const latLng = await getUserLatLng(item.locality, item.city, item.state);
        const address = {
          fullAddress: { locality: item.locality, city: item.city, state: item.state },
          cords: latLng,
        };
        return { ...item, address };
      })
    );

    // Update listings on the Sanity server
    await Promise.all(
        updatedResponse.map(async (updatedItem) => {
          await client.createOrReplace(updatedItem);
        })
      );
  
      console.log("Listings updated successfully.");
  } catch (error) {
    console.log(error);
  }
}
