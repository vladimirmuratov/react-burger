import {ReactNode} from "react";

export type TProps = {
    children: ReactNode;
    exact?: boolean;
    path: string;
}