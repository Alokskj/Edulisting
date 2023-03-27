import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link, useNavigate } from 'react-router-dom';
const FeatureWidget = ({icon, title, subtitle, link}) => {
  const navigate = useNavigate()
  return (
    <Link to={link}>
    <div className='card flex items-center cursor-pointer  w-full'>
      <div className="icon mr-4">
      {icon}
      </div>
      <div className='flex justify-between items-center w-full'>
      <div className="text">
        <div className="main-text  text-lg capitalize" style={{fontWeight: "640"}}>
            <p>{title}</p>
        </div>
        <div className="subtext capitalize font-light">
            <p>{subtitle}</p>
        </div>
      </div>
      <div className="go-arrow">
            <ArrowForwardIosIcon />
      </div>
      </div>
      
    </div>
    </Link>
  )
}

export default FeatureWidget