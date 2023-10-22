const PageLayout = ({children, className}) => {
    return ( 
        <div className={`${className} flex flex-col justify-center w-full items-center p-4 sm:px-4 md:px-20 lg:px-24 md:mt-4 mb:28`}>{children}</div>
     );
}
 
export default PageLayout;