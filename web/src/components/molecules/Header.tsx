import { useAtom } from "jotai";
import { screenModeAtom } from "../../../src/store"
import { KeyManager } from "./KeyManager";


export const Header = () => {
    const [screenMode, setScreenMode] = useAtom(screenModeAtom);
    return(
        <header className="absolute inset-x-0 top-16 z-10 text-center">
            <KeyManager/>
        </header>
    )
}