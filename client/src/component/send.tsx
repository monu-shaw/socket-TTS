import { useEffect, useState } from "react"
import { SocketOptions, io } from "socket.io-client";


function Send() {
  const [socket, setSocket] = useState<SocketOptions>()
  useEffect(()=>{
    let soc:SocketOptions= io('https://redesigned-winner-wx5qg64qrpq2gw6r-3000.app.github.dev')
    console.log(soc); 
    setSocket(soc);
    
  },[])
  return (
    <div>
      Send
    </div>
  )
}

export default Send