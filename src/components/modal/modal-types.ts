import {ReactNode} from "react";

export type TProps = {
    title?: string;
    onClose: () => void;
    children: ReactNode;
}