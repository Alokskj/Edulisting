import { ShareRounded } from '@mui/icons-material'
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ShareIcon from '@mui/icons-material/Share';
import { RWebShare } from 'react-web-share';

const ListingHeader = ({id, title , description  }) => {
    const navigate = useNavigate()
    
  return (
    <div id='header' className="header-container  flex justify-center shadow-xl">
    <header className='flex justify-between px-4 py-4 items-center container '>
       <Link to="/" > <div  className="logo capitalize cursor-pointer poppins text-3xl font-bold"><p>edulisting</p></div></Link>
       <RWebShare
        data={{
          text: `${title} : ${description}`,
          url: `https://www.edulisting.in
/listings/${id}`,
          title: `${title} - Edulisting`,
        }}
        onClick={() => console.log("shared successfully!")}
      >
        
        <ShareIcon fontSize='medium'/>
        </RWebShare>
    </header>
    </div>
  )
}

export default ListingHeader