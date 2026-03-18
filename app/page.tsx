"use client"

import { useState } from "react"

export default function Home(){

const [text,setText] = useState("")
const [results,setResults] = useState<any[]>([])
const [loading,setLoading] = useState(false)
const [generated,setGenerated] = useState(false)
const [copied,setCopied] = useState("")


const suggestions=[

"marry me",
"I like you",
"Can you help me edit?",
"can we be together?",
"Are you free tonight?",
"Could I borrow some money?",
"send me your project data/code",
"Can I stay with you?",
"Why are you still single?",
"Can you pay for this?",
"Take my shift tomorrow?",
"Can you drive me home?",
"Let's split the bill?",
"Give me your Netflix password?",
"How much is your salary?",
"Why do you eat that?",
"Don't you trust me?",
"I want to date you"

]


const bubblePositions=[

{top:"5%",left:"13%"},
{top:"28%",left:"13%"},
{top:"37%",left:"18%"},
{top:"40%",left:"4%"},
{top:"8%",left:"20%"},
{top:"8%",left:"70%"},
{top:"10%",left:"50%"},
{top:"18%",left:"45%"},
{top:"20%",left:"15%"},
{top:"9%",left:"32%"},
{top:"23%",left:"75%"},
{top:"15%",left:"70%"},
{top:"25%",left:"2%"},
{top:"32%",left:"88%"},
{top:"32%",left:"70%"},
{top:"45%",left:"80%"},
{top:"39%",left:"82%"},
{top:"27%",left:"68%"}

]


async function generate(){

if(!text) return

setLoading(true)

const res=await fetch("/api/generate",{

method:"POST",

body:JSON.stringify({message:text})

})

const data=await res.json()

setResults([
{ tone:"Gentle", emoji:"💙", text:data.result.gentle },
{ tone:"Playful", emoji:"😄", text:data.result.playful },
{ tone:"Savage", emoji:"😈", text:data.result.direct }
])

setGenerated(true)

setLoading(false)

}


function copy(text:string){

navigator.clipboard.writeText(text)

setCopied(text)

setTimeout(()=>{

setCopied("")

},1500)

}


return(

<main style={{

minHeight:"100vh",

display:"flex",

alignItems:"center",

justifyContent:"center",

position:"relative",

padding:"40px"

}}>


{/* floating bubbles */}

<div className="floating-bubbles">

{suggestions.map((s,i)=>(

<button

key={i}

onClick={()=>setText(s)}

className="bubble"

style={bubblePositions[i]}

>

{s}

</button>

))}

</div>



{/* logo */}

<div style={{

position:"absolute",
top:40,
left:60,
fontWeight:700,
fontSize:22

}}>

SayNo AI

</div>



{/* main glass container */}

<div

className="glass"

style={{

maxWidth:1100,
margin:"0 auto",
padding:"60px 80px"

}}

>



{/* title */}

<div style={{textAlign:"center",marginBottom:40}}>

<h1 style={{

fontSize:48,
fontWeight:800

}}>

Just Say No 😜

</h1>

</div>



{/* label */}

<div style={{

fontSize:18,
fontWeight:600,
marginBottom:10

}}>

When he/she says:

</div>



{/* textarea */}

<textarea

value={text}

onChange={(e)=>setText(e.target.value)}

placeholder="What she/he say..."

style={{

width:"100%",
height:80,
borderRadius:12,
border:"1px solid #ddd",
padding:16,
fontSize:14

}}

/>



{/* generate button */}

<div style={{textAlign:"center",marginTop:30}}>

<button

onClick={generate}

disabled={loading}

className="generate-btn"

>

{loading ? "Generating..." : generated ? "Regenerate" : "Generate"}

</button>

</div>


{/* loading */}

{loading &&(

<div style={{textAlign:"center",marginTop:30}}>

<div

style={{

width:40,
height:40,
border:"4px solid #ddd",
borderTop:"4px solid #6366f1",
borderRadius:"50%",
margin:"0 auto",
animation:"spin 1s linear infinite"

}}

></div>

</div>

)}



{/* results */}

{results.length>0 &&(

<div

style={{

display:"grid",
gridTemplateColumns:"1fr 1fr 1fr",
gap:30,
marginTop:60

}}

>

{results.map((r,i)=>(
<div
key={i}
className="card"
style={{animationDelay:`${i*0.15}s`}}
>

<div className={`toneTag ${r.tone.toLowerCase()}`}>
{r.emoji} {r.tone}
</div>

<p className="cardText">
{r.text}
</p>

<button
onClick={()=>copy(r.text)}
className="copyBtn"
>
{copied===r.text ? "✓" : "📋"}
</button>

</div>
))}

</div>

)}

</div>

{/* footer */}

<footer className="footer">

<p>Social survival replies powered by AI</p>

<div className="footer-links">

<a href="/privacy">Privacy Policy</a>

<a href="/terms">Terms of Service</a>

</div>

</footer>


</main>

)

}