import { Card, Col, Row, Select,Form, Typography, Input, Button } from "antd";
import { FormEventHandler, useEffect, useState } from "react"
import { Socket, SocketOptions, io } from "socket.io-client";

type Products = Array<{
  name: string;
  amount: number;
}>
function Recieve() {
  const [socket, setSocket] = useState<Socket>()
  const [history,setHistory] = useState<Products>([])
  const [currentVoice,setCurrentVoices] = useState<SpeechSynthesisVoice|String>()
  
  const [voices, setVoices] = useState<Array<SpeechSynthesisVoice>>([]);
  const speak = (text:string,v:string|null)=>{
  const utterance = new SpeechSynthesisUtterance(text);   
  utterance.voice = window.speechSynthesis.getVoices().filter(i=>i.voiceURI===v?v:currentVoice)[0]
  window.speechSynthesis.speak(utterance);
}
useEffect(()=>{
  let voi = window.speechSynthesis.getVoices();
  console.log(voi);
  
    setVoices(voi)
    setVoices(voi)
    setCurrentVoices(voi[0]);
    
    let soc:Socket= io('http://192.168.43.2:3000')
    setSocket(soc)
    soc.on('recieve', (payload)=>{ 
      setHistory(i=>[...i,...[JSON.parse(payload)]]);
    })
    return () => {
      soc.off('recieve', ()=>{console.log('dis')});
    };
  },[])
  useEffect(()=>{
    //console.log(history);
  },[history,voices])
  

  const onSubmit = (v:{text:string,voices:string}) => {
    setCurrentVoices(v.voices)
    speak(v.text,v.voices)
  };
  return (
    <div>
      <Row justify={'center'}>
      <Card>
      <Form onFinish={onSubmit}>
        <Form.Item name="voices" label="Voices">
          <Select options={voices.map((voice) => ({label:voice?.name,value:voice?.voiceURI,}))} />
        </Form.Item>
        <Form.Item label="Text" name={'text'}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Play
          </Button>
        </Form.Item>
      </Form>
    </Card>
        {history.map((i,iIndex)=>(
          <Col span={24} key={iIndex}>
            <Typography.Text >{i?.amount} - {i?.name}</Typography.Text>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Recieve