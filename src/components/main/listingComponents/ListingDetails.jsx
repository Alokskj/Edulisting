import React from "react";

const ListingDetails = ({ queryPost }) => {
  return (
    <div className="details-descripiton-container w-full  rounded-lg border border-black divide-y-2 px-6 py-4 flex flex-col gap-4">
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
          {queryPost.edition && (
            <div className="item flex justify-between w-full">
              <div className="key max-w-1/2">Edition</div>
              <div className="value basis-1/2">
                {queryPost?.edition || "Not Specified"}
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
