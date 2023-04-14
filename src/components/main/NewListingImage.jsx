import React from 'react'
import DeleteIcon from "@mui/icons-material/Delete";

const NewListingImage = ({imageAsset, uploadImage, setImageAsset}) => {
  return (
    <>
    <div className="flex lg:flex-row flex-col justify-center mb-2 items-center bg-gray-200 lg:p-5 p-3  w-full">
            <div className="bg-secondaryColor flex p-3 flex-0.7 w-full ">
              <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-40">
                

                {!imageAsset ? (
                  <label>
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col items-center justify-center">
                        <p className="font-bold text-2xl">
                          <i className="fa-solid fa-cloud-arrow-up"></i>
                        </p>
                        <p className="text-lg">Click to upload</p>
                      </div>
                      <p className="mt-3 text-xs text-gray-400">
                        Only use JPG, SVG, PNG, GIF or JPEG
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload-image"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                ) : (
                  <div className="relative h-full">
                    <img
                      src={imageAsset?.url}
                      alt="uploaded-pic"
                      className="h-full w-full"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                      onClick={() => setImageAsset(null)}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

    </>
  )
}

export default NewListingImage