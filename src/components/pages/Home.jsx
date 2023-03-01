import React from 'react'
import RecentPost from '../main/RecentPost'
import Header from '../header/header'
import MobileNav from '../header/MobileNav'
import Seacrhbar from '../header/Seacrhbar'

const Home = () => {
  
  return (
    <>
    <Header />
    <Seacrhbar />
    <RecentPost />
    <MobileNav />
    </>
  )
}

export default Home