import WalletBox from "./WalletBox";

const MyWallet = () => {
    return (
    <div className="flex w-full items-center justify-center mt-3 min-h-[150px]">
        <div className="w-full min-w-[320px] h-full flex items-center flex-col">
            <div className="flex flex-col w-full items-center justify-center">
                <div className="mt-[12px] mb-[39px] text-center flex">
                    <span className="mr-[1px] inline-block"><svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_272_17162" maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40"><rect width="40" height="40" fill="white"></rect></mask><g mask="url(#mask0_272_17162)"><g filter="url(#filter0_d_272_17162)"><path d="M21.6612 24.7196V20.6592C21.6612 19.8276 22.3392 19.1534 23.1755 19.1534H31.3498V15.7074C31.3498 15.0931 30.8525 14.5986 30.2348 14.5986H8.98165C8.36387 14.5986 7.86664 15.0931 7.86664 15.7074V30.0909C7.86664 30.7052 8.36387 31.1996 8.98165 31.1996H30.2348C30.8525 31.1996 31.3498 30.7052 31.3498 30.0909V26.2253H23.1755C22.3392 26.2253 21.6612 25.5511 21.6612 24.7196Z" fill="#464646"></path><path d="M31.3724 19.9028H23.183C22.7612 19.9028 22.4221 20.2399 22.4221 20.6595V24.7198C22.4221 25.1393 22.7612 25.4765 23.183 25.4765H31.3724C31.7943 25.4765 32.1333 25.1393 32.1333 24.7198V20.6595C32.1333 20.2399 31.7943 19.9028 31.3724 19.9028ZM24.9008 23.6336C24.3734 23.6336 23.9515 23.214 23.9515 22.6896C23.9515 22.1652 24.3734 21.7457 24.9008 21.7457C25.4281 21.7457 25.85 22.1652 25.85 22.6896C25.85 23.214 25.4281 23.6336 24.9008 23.6336Z" fill="#464646"></path><path d="M21.7517 10.928L20.9003 9.56458C20.4558 8.85289 19.5819 8.59069 18.9566 8.98025L11.0837 13.8497H13.713L21.7517 10.9355V10.928Z" fill="#464646"></path><path d="M27.1233 11.1452C26.837 10.3586 26.0384 9.92413 25.3453 10.1788L23.2584 10.9355L15.2197 13.8496H28.1178L27.1233 11.1452Z" fill="#464646"></path></g></g><defs><filter id="filter0_d_272_17162" x="1.86664" y="4.7998" width="36.2667" height="34.3999" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="2"></feOffset><feGaussianBlur stdDeviation="3"></feGaussianBlur><feComposite in2="hardAlpha" operator="out"></feComposite><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_272_17162"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_272_17162" result="shape"></feBlend></filter></defs></svg></span>
                    <h1 className="text-center font-bold">my wallet</h1>
                </div>
                <WalletBox title={"Available Push"} amount={100} type={"Push"}/>
                <WalletBox title={"Received Push"} amount={10000} type={"Push"}/>
                <WalletBox title={"Royalty"} amount={200} type={"INR"}/>
            </div>
        </div>
    </div>
    )
}

export default MyWallet;