import React from 'react'
import Post from './Post'
const RecentPost = () => {
  return (
    <div className='recent-post mx-4 my-8 mb-24'>
        <div className="recent-post-title capitalize my-2  lg:m-4 text-xl text-gray-500"><p>Fresh recommendations</p></div>
        <div className="posts grid grid-cols-2  md:grid-cols-3 lg:grid-cols-5  md:m-4 gap-4">
            <Post image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMLWgO_b7XnJOC8rR6kCqOTX4I4DOgiJ3PLA&usqp=CAU" title="chemistry" price="100" location="sham nagar, rajpura"/>
           <Post image="https://ncert.nic.in/textbook/pdf/kemh1cc.jpg" title="maths" price="120" location="dalmia vihar, rajpura" />
           <Post image="https://rukminim1.flixcart.com/image/312/312/ko62xzk0/regionalbooks/k/k/o/ncert-biology-book-for-class-xi-original-imag2zephqaf55zq.jpeg?q=70" title="Biology" price="140" location="vikas nagar, rajpura" />
           <Post image="https://m.media-amazon.com/images/I/81z3fAFWxOL.jpg" title="Computer" price="240" location="basant vihar, rajpura" />
           <Post image="https://www.schoolwaale.com/wp-content/uploads/2019/08/105.png" title="English" price="100" location="dalmia vihar, rajpura" />
           <Post image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF2q1tdvqgCUTL_VW918Sm29NrwA7kXys_Rw&usqp=CAU" title="Physics" price="80" location="Gobind colony, rajpura" />
        </div>
    </div>
  )
}

export default RecentPost