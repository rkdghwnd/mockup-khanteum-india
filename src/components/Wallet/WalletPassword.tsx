import { MouseEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const box = "flex items-center justify-center border-solid border-2 bg-white w-[31px] h-[47px] border-slate-400 rounded-md text-center"
export const keypad = "flex items-center justify-center border-solid border-2 bg-white shadow-md w-[31px] h-[47px] rounded-xl w-[72px] h-[36px]"

const WalletPassword = () => {
    const inputRef = useRef<HTMLInputElement[] | null[]>([]);
    const indexRef = useRef<number>(0);
    const navigator = useNavigate()

    const keypadArray = [1,2,3,4,5,6,7,8,9,"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTEiIHZpZXdCb3g9IjAgMCAxOCAxMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQuNDg4NzUgN0wxOCA3TDE4IDQuNUw0LjQ4ODc1IDQuNUw0LjQ4ODc1IDAuNzQ5OTk5TC00LjM3MTE0ZS0wNyA1Ljc1TDQuNDg4NzUgMTAuNzVMNC40ODg3NSA3WiIgZmlsbD0iIzAwRDVDOCIvPgo8L3N2Zz4K",0,"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxOSAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwLjYxOSAwLjIyODI3MUM2LjM1OTAzIDAuMjI4MjcxIDIuOTA0NzQgMy42MjA2OCAyLjkwNDc0IDcuODA0MzZIMC4zMzMzMTNMMy43NjE4OCAxMS4xNzE1TDcuMTkwNDYgNy44MDQzNkg0LjYxOTAzQzQuNjE5MDMgNC41NDY2NCA3LjMwMTg4IDEuOTExODUgMTAuNjE5IDEuOTExODVDMTMuOTM2MiAxLjkxMTg1IDE2LjYxOSA0LjU0NjY0IDE2LjYxOSA3LjgwNDM2QzE2LjYxOSAxMS4wNjIxIDEzLjkzNjIgMTMuNjk2OSAxMC42MTkgMTMuNjk2OUM5LjMyNDc0IDEzLjY5NjkgOC4xMjQ3NCAxMy4yODQ0IDcuMTM5MDMgMTIuNjAyNUw1LjkyMTg5IDEzLjgxNDdDNy4yMjQ3NCAxNC43OTEyIDguODUzMzEgMTUuMzgwNCAxMC42MTkgMTUuMzgwNEMxNC44NzkgMTUuMzgwNCAxOC4zMzMzIDExLjk4OCAxOC4zMzMzIDcuODA0MzZDMTguMzMzMyAzLjYyMDY4IDE0Ljg3OSAwLjIyODI3MSAxMC42MTkgMC4yMjgyNzFaIiBmaWxsPSIjMDBENUM4Ii8+Cjwvc3ZnPgo="];
    const handleKeypdClick = (e: MouseEvent<HTMLButtonElement>) => {
        const input = inputRef.current;
        const idx = indexRef.current;
        if(e.currentTarget.value === "10") {
            deleteNumber();
            return;
        }
        if(e.currentTarget.value === "12") {
            inputRef.current.map((num) => { if(num) num.value = "" })
            indexRef.current = 0;
            return;
        }
        if(input[idx]) {
            e.currentTarget.value === "11" ? input[idx]!.value = "0" : input[idx]!.value = e.currentTarget.value;
            if (idx < input.length) indexRef.current += 1;
            if (idx === 5) {
                navigator("/myWallet");
            }
        }
    }

    const deleteNumber = () => {
        const input = inputRef.current;
        const idx = indexRef.current === 0 ? 0 : indexRef.current -1;
        if(input[idx]) {
            input[idx]!.value = "";
            if(indexRef.current > 0) indexRef.current -= 1;
        }
    }

    return(
    <div className="flex w-full items-center justify-center mt-3 min-h-[150px]">
        <div className=" w-4/5 min-w-[320px] h-full flex items-center flex-col">
            <div className="flex flex-col w-full items-center justify-center">
                <div className="mt-12 mb-3">Please enter your password.</div>
                <div className="mb-12 text-xs underline text-slate-500">Forgot your password?</div>
                <div className="flex flex-row mb-10 items-center justify-center gap-3">
                    {[0,1,2,3,4,5].map((num) => (
                            <input key={num} type="text" maxLength={1} ref={(el) => (inputRef.current[num] = el)} className={box}/>
                    ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                    {keypadArray.map((num, idx) => (
                    <button onClick={handleKeypdClick} key={idx} value={idx+1} className={keypad}>{typeof(num)==="number" ? num : <img src={num} alt={String(idx)}/>}</button>
                    ))}
                </div>
            </div>
        </div>
    </div>
    );
}

export default WalletPassword;