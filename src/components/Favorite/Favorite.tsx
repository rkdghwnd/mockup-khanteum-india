const Favorite = () => {
    return (
        <div className="flex w-full items-center justify-center mt-3 min-h-[150px]">
            <div className="hidden md:flex w-full min-w-[320px] h-full lg:flex justify-center items-center flex-col">
                <img src="/pages/FAVORITES.png"/>
            </div>
            <div className="md:hidden sm:flex w-full min-w-[320px] h-full flex justify-center items-center flex-col">
                <img src="/pages/FAVORITES_MOBILE.jpeg"/>
            </div>
        </div>
    )
}

export default Favorite;