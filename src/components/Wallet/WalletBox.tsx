type WalletBoxProps = {
 title: string
 amount: number
 type: string
}

const WalletBox = ({title, amount, type}: WalletBoxProps) => {
    return ( 
    <div className="py-[18px] max-w-[396px] mb-[20px] w-[calc(100%-50px)] border-solid border rounded-lg shadow-lg">
        <div className="rlative px-[17px] mb-[20px]">
            <h3 className="text-[16px] text-slate-600">{title}</h3>
            <h2 className="text-[22px] font-semibold text-slate-600">{amount.toLocaleString()} {type}</h2>
        </div>
        <div className="w-[calc(100%-34px)] m-auto ">
            <button className="w-[calc(50%-9px)] h-[27px] text-sm mr-[18px] shadow-md border-solid border rounded-lg border-slate-900 bg-black text-neutral-50">충전하기</button>
            <button className="w-[calc(50%-9px)] h-[27px] text-sm shadow-md border-solid border rounded-lg border-slate-900">상세내역</button>
        </div>
    </div>)
}

export default WalletBox;