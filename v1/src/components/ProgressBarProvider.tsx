"use client"
import {ReactNode} from "react";
import {AppProgressBar} from "next-nprogress-bar";

export function ProgressBarProvider({ children }: { children: ReactNode }) {
    return (
        <>
            {children}
            <AppProgressBar height="4px"
                            color="#b2823a"
                            options={{ showSpinner: false }}
                            shallowRouting/>
        </>
    )
}