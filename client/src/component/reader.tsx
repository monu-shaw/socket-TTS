import { Button, Card, Col, Form, Input, Row, Select, Space } from 'antd'
import   { useEffect, useState } from 'react'

const Reader=()=>{
  
  const [voices, setVoices] = useState<Array<SpeechSynthesisVoice>>([]);
  const speech = window.speechSynthesis
  const  [text, setText] = useState('')
  const [voice, setVoice] = useState()

  const speak2 = ()=>{
  const utterance = new SpeechSynthesisUtterance(text);   
  utterance.voice = voices.filter(i=>i.voiceURI===voice)[0]
  speech?.speak(utterance);
}
useEffect(()=>{
  window.speechSynthesis.onvoiceschanged =function(){
    let voi = window.speechSynthesis.getVoices();
      setVoices(voi)
  }
    window.speechSynthesis.getVoices();
    return ()=>{
      window.speechSynthesis.cancel()
    }
  },[]) 
  

  const onSubmit = (v:any) => {
    console.log(v)
    speak2()
  };
    return(
        <Row justify={"center"}>
        <Col xs={24} sm={24} md={20} lg={15}>
          <Card>
            <Form onFinish={onSubmit} layout='vertical'>
              <Form.Item name="voices" label="Voices">
                <Select
                  options={voices.map((voice) => ({
                    label: voice?.name,
                    value: voice?.voiceURI,
                  }))}
                  onChange={e=>setVoice(e)}
                />
              </Form.Item>
              <Form.Item label="Text" name={"text"}>
                <Input.TextArea onChange={e=>setText(e.target.value)} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Play 
                </Button>
                {speech.speaking&&
                <Space>
                  <Button type="primary" htmlType="submit" >
                    Pause
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Resume
                  </Button>
                </Space>}
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    )
}

export default Reader