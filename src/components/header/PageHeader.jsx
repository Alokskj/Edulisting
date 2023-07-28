import React from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PageHeader = ({pathname}) => {
  const navigate = useNavigate()

  return (
    <div className="setting-header  border-b-2 p-4 space-x-4 items-center flex justify-start">
        <div
          onClick={() => navigate(-1)}
          className="close font-bold cursor-pointer"
        >
          <ArrowBackIcon />
        </div>
        <div className="setting-title capitalize font-semibold text-xl">
          <h1>{pathname}</h1>
        </div>
      </div>
  )
}

export default PageHeader