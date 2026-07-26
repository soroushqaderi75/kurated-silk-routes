import type { Metadata } from "next";

import {
  Cormorant_Garamond,
  Vazirmatn,
  Amiri
} from "next/font/google";

import "./globals.css";


const fashionFont = Cormorant_Garamond({

  variable: "--font-fashion",

  subsets:["latin"],

  weight:[
    "400",
    "500",
    "600",
    "700"
  ]

});


const persianFont = Vazirmatn({

  variable:"--font-persian",

  subsets:["arabic"],

  weight:[
    "300",
    "400",
    "500",
    "600",
    "700"
  ]

});


const miwaniFont = Amiri({

  variable:"--font-miwani",

  subsets:["arabic"],

  weight:[
    "400",
    "700"
  ]

});


export const metadata: Metadata = {

title:"MIWANI | Fashion is an invitation",

description:
"MIWANI is a curated fashion marketplace where every garment tells a story."

};



export default function RootLayout({

children,

}:Readonly<{

children:React.ReactNode;

}>) {


return (

<html

lang="fa"

dir="rtl"

className={`
${fashionFont.variable}
${persianFont.variable}
${miwaniFont.variable}
antialiased
`}

>


<body

className="
min-h-screen
flex
flex-col
font-[var(--font-persian)]
"

>

{children}

</body>


</html>

);


}