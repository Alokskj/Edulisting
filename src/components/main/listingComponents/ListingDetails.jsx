import React from "react";
import { Helmet } from "react-helmet-async";
import Skeleton from "react-loading-skeleton";
import { urlFor } from "../cdnClient";

const ListingDetails = ({ queryPost }) => {
 
  const generateDescription = (listing) => {
    const defaultDescription =
      "Discover great deals on books at Edulisting. Buy or sell old school and class books hassle-free.";
    let description = defaultDescription;

    if (
      listing.title &&
      listing.board &&
      listing.standard &&
      listing.locality &&
      listing.subject
    ) {
      description = `${listing.title} - ${listing.description} , Class ${listing.standard}, located in ${listing.locality}, subject ${listing.subject}.`;
    }

    return description;
  };
  if(!queryPost){
    return(
      <div className="details-descripiton-container w-full  rounded-lg border border-black divide-y-2 px-6 py-4 flex flex-col gap-4">
        
      <div className="details-container w-full gap-3 flex flex-col justify-start ">
        <h2 className="text-2xl font-semibold"><Skeleton width={150}  height={40} containerClassName='flex-1'/></h2>
        <div className="details grid gap-3 grid-cols-1 lg:grid-cols-2">
          
            <div className="item flex justify-between w-full ">
              <div className="key max-w-1/2"><Skeleton width={100}  height={25} containerClassName='flex-1'/></div>
              <div className="value basis-1/2">
              <Skeleton width={100}  height={25} containerClassName='flex-1'/>
              </div>
            </div>
          
         
            <div className="item flex justify-between w-full">
              <div className="key max-w-1/2"><Skeleton width={100}  height={25} containerClassName='flex-1'/></div>
              <div className="value basis-1/2">
              <Skeleton width={100}  height={25} containerClassName='flex-1'/>
              </div>
            </div>
          
         
            <div className="item flex justify-between w-full">
              <div className="key max-w-1/2"><Skeleton width={100}  height={25} containerClassName='flex-1'/></div>
              <div className="value basis-1/2"><Skeleton width={100}  height={25} containerClassName='flex-1'/></div>
            </div>
         
          
            <div className="item flex justify-between w-full">
              <div className="key max-w-1/2"><Skeleton width={100}  height={25} containerClassName='flex-1'/></div>
              <div className="value basis-1/2">
              <Skeleton width={100}  height={25} containerClassName='flex-1'/>
              </div>
            </div>
          
         
          <div className="item flex justify-between w-full">
            <div className="key max-w-1/2"><Skeleton width={100}  height={25} containerClassName='flex-1'/></div>
            <div className="value basis-1/2">
            <Skeleton width={100}  height={25} containerClassName='flex-1'/>
            </div>
          </div>


          <div className="item flex justify-between w-full">
            <div className="key max-w-1/2"><Skeleton width={100}  height={25} containerClassName='flex-1'/></div>
            <div className="value basis-1/2">
            <Skeleton width={100}  height={25} containerClassName='flex-1'/>
            </div>
          </div>
        </div>
      </div>
        
      <div className="description flex flex-col py-4 gap-3">
        <h2 className="text-2xl font-semibold"><Skeleton width={200}  height={40} containerClassName='flex-1'/></h2>
        <p><Skeleton width={300}   height={25} containerClassName='flex-1'/></p>
      </div>

    </div>
    )
  }
  return (
    <div className="details-descripiton-container w-full  rounded-lg border border-black divide-y-2 px-6 py-4 flex flex-col gap-4">
      <Helmet>
          <title>{queryPost.title}</title>
          <meta name="description" content={generateDescription(queryPost)} />
          <meta property="og:title" content={queryPost.title} />
          
          <meta
            property="og:description"
            content={generateDescription(queryPost)}
          />
          <meta
            property="og:image"
            content={urlFor(queryPost.image).format("webp").url()}
          />
          <meta property="og:url" content={window.location.href} />
          <meta property="og:type" content="website" />
        </Helmet>
      <div className="details-container w-full gap-3 flex flex-col justify-start ">
        <h2 className="text-2xl font-semibold">Details</h2>
        <div className="details grid gap-3 grid-cols-1 lg:grid-cols-2">
          {queryPost.standard && (
            <div className="item flex justify-between w-full ">
              <div className="key max-w-1/2">Class</div>
              <div className="value basis-1/2">
                {queryPost?.standard || "Not Specified"}
              </div>
            </div>
          )}
          {queryPost.edition !== "" && (
            <div className="item flex justify-between w-full">
              <div className="key max-w-1/2">Edition</div>
              <div className="value basis-1/2">
                {(queryPost?.edition || "Not Specified")}
              </div>
            </div>
          )}
          {queryPost.subject && (
            <div className="item flex justify-between w-full">
              <div className="key max-w-1/2">Subject</div>
              <div className="value basis-1/2">{queryPost.subject}</div>
            </div>
          )}
          {queryPost.board && (
            <div className="item flex justify-between w-full">
              <div className="key max-w-1/2">Board</div>
              <div className="value basis-1/2">
                {queryPost.board === "other"
                  ? "Not specified"
                  : queryPost.board}
              </div>
            </div>
          )}
          {queryPost.condition && 
          <div className="item flex justify-between w-full">
            <div className="key max-w-1/2">Condition</div>
            <div className="value basis-1/2">
              {queryPost?.condition || "Not Specified"}
            </div>
          </div>
}
{queryPost.publisher &&
          <div className="item flex justify-between w-full">
            <div className="key max-w-1/2">Publisher</div>
            <div className="value basis-1/2">
              {queryPost?.publisher || "Not Specified"}
            </div>
          </div>}
        </div>
      </div>
        {queryPost.description && 
      <div className="description flex flex-col py-4 gap-3">
        <h2 className="text-2xl font-semibold">Description</h2>
        <p>{queryPost?.description}</p>
      </div>
}
    </div>
  );
};

export default ListingDetails;
