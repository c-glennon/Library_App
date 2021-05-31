import React, { createContext, useState } from 'react';

const TitleContext = createContext();

function TitleProvider({ children }) {
    const [title, setTitle] = useState("");
    return (
    <TitleContext.Provider value={{ title, setTitle }}>
      {children}
    </TitleContext.Provider>
    );
}

export default TitleProvider;
export { TitleContext };