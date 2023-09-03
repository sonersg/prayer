import { createContext, useState } from "react";

export const ReRenderContext = createContext();

export default function ReRenderProvider({ children }) {
    const [reRender, setReRender] = useState(false);

    const values = {
        reRender,
        setReRender,
    };

    return (
        <ReRenderContext.Provider value={values}>
            {children}
        </ReRenderContext.Provider>
    );
}
