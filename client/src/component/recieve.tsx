import { Card, Col, Row, Select,Form, Typography, Input, Button } from "antd";
import {  useEffect, useState } from "react"
import { Socket, io } from "socket.io-client";
import { BaseRoute } from "./rotes";

type Products = Array<{
  name: string;
  amount: number;
}>
function Recieve() {
  const [history,setHistory] = useState<Products>([])
  const [currentVoice,setCurrentVoices] = useState<SpeechSynthesisVoice|String>()
  
  const [voices, setVoices] = useState<Array<SpeechSynthesisVoice>>([]);

  const speak = (text:string)=>{
    const utterance = new SpeechSynthesisUtterance(text);   
    utterance.voice = voices.filter(i=>i.voiceURI===currentVoice)[0]
    alert(currentVoice)
    window.speechSynthesis.speak(utterance);
  }
const speak2 = (text:string,v:string)=>{
  const utterance = new SpeechSynthesisUtterance(text);   
  utterance.voice = voices.filter(i=>i.voiceURI===v)[0]
  window.speechSynthesis.speak(utterance);
}
useEffect(()=>{
  window.speechSynthesis.onvoiceschanged =function(){
    let voi = window.speechSynthesis.getVoices();
      setVoices(voi)
  }
  window.speechSynthesis.getVoices();
    let soc:Socket= io(BaseRoute)
    soc.on('recieve', (payload)=>{  
      let word = JSON.parse(payload)
      let sentence = `Recieved rupees ${word?.amount} From ${word?.name}`
      speak(sentence)
      setHistory(i=>{i.push(word);return [...i]});
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
    speak2(v.text,v.voices)
  };
  return (
    <div>
      <Row justify={"center"}>
        <Col xs={24} sm={24} md={20} lg={15}>
          <Card>
            <Form onFinish={onSubmit}>
              <Form.Item name="voices" label="Voices">
                <Select
                  options={voices.map((voice) => ({
                    label: voice?.name,
                    value: voice?.voiceURI,
                  }))}
                  onChange={(e) => setCurrentVoices(e)}
                />
              </Form.Item>
              <Form.Item label="Text" name={"text"}>
                <Input.TextArea />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Play 
                </Button>
              </Form.Item>
            </Form>
            <Col>{JSON.stringify(currentVoice)}</Col>
          </Card>
        </Col>
        {history.map((i, iIndex) => (
          <Col span={24} key={iIndex}>
            <Typography.Text>
              {i?.amount} - {i?.name}
            </Typography.Text>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Recieve