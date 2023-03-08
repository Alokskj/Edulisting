import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
const Category = () => {
  const navigate = useNavigate()

  
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false
      },
      "google_translate_element"
    );
  };
  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;

  }, []);
  return (
      <div className='px-12 flex justify-between p-2 bg-[#220080] text-white font-semibold capitalize'>
        
        <div className="lan-sel relative cursor-pointer"><p>En ▼</p>
        <div className='absolute w-full h-full top-0 left-0 opacity-0' id="google_translate_element"></div>
        </div>
        <div className="cate flex ">
            <div className="items border-r-2 pr-8 cursor-pointer hover:underline">Class 12th</div>
            <div className="items border-r-2 px-8 cursor-pointer hover:underline">Class 11th</div>
            <div className="items border-r-2 px-8 cursor-pointer hover:underline">Class 10th</div>
            <div className="items border-r-2 px-8 cursor-pointer hover:underline">ICSE</div>
            <div className="items border-r-2 px-8 cursor-pointer hover:underline">PSEB</div>
            <div className="items  pl-8 cursor-pointer hover:underline">NCERT</div>


           

        </div>
        <div className="login" onClick={()=> navigate("/login")}>
            <button className='underline'>Login</button>
        </div>
    </div>
  )
}

export default Category