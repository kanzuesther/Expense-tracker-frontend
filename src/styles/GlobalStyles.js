import { createGlobalStyle } from "styled-components";

export const GlobalStyle= createGlobalStyle`
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    list-style: none;
}

:root{
    --primary-color:#222260;
    --primary-color:#222260;
    --primary-color:#222260;
    --color-grey:#aaa;
    --color-green:#42AD00;
    --color-accent:#F56692;
    --color-delete:#FF0000;
}

body{
    font-family:'Nunito',sans-serif ;
    background-color:red ;
}
`;