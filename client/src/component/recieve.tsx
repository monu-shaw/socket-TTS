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
  
  const [voices, setVoices] = useState<Array<SpeechSynthesisVoice>>([]);
const speak = (text:string,v)=>{
  const utterance = new SpeechSynthesisUtterance(text);   
  utterance.voice = v;
  window.speechSynthesis.speak(utterance);
}
useEffect(()=>{
    setVoices(window.speechSynthesis.getVoices())
    
    let soc:Socket= io('http://192.168.19.1:3000')
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
    console.log(voices);
    
  },[history,voices])
  

  const onSubmit = (v:FormEventHandler) => {
    speak(v.text,v.voices)
  };
  return (
    <div>
      <Row>
      <Card>
      <Form onFinish={onSubmit}>
        <Form.Item name="voices" label="Voices">
        <Select options={voices.map((voice) => ({label:voice?.name,value:voice?.name}))} />
        </Form.Item>
        <Form.Item label="Text" name={'text'}>
          <Input />
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