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

  useEffect(()=>{
    const utterance = new SpeechSynthesisUtterance("Hello, world!");
    //utterance.text = "Hello, world!";      
    console.log(window.speechSynthesis.getVoices())
    setVoices(window.speechSynthesis.getVoices())
    utterance.voice = window.speechSynthesis.getVoices()[0];
    window.speechSynthesis.speak(utterance);
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
    
  },[history])
  

  const onSubmit = (v:FormEventHandler) => {
    console.log("Voices:", v);
  };
  return (
    <div>
      <Row>
      <Card>
      <Form onFinish={onSubmit}>
        <Form.Item name="voices" label="Voices">
        <Select  onChange={setVoices} options={voices.map((voice) => (voice?.name))}>

            
          </Select>
        </Form.Item>
        <Form.Item label="Text">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={onSubmit}>
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