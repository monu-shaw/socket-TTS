import { Button, Card, Col, Form, Input, Row } from 'antd';
import { FormItemInputProps } from 'antd/es/form/FormItemInput';
import React, { useEffect, useState } from 'react'
import { Socket, SocketOptions, io } from 'socket.io-client';

function Send() {
  const [socketT, setSocket] = useState<Socket>()
  useEffect(()=>{
    let socket:Socket= io('http://192.168.19.1:3000')
    setSocket(socket)
    socket.on('disconnect', ()=>{console.log('dis')});

    return () => {
      socket.off('disconnect', ()=>{console.log('dis')});
    };
  },[])
  const HandelSend=(v:FormItemInputProps)=>{
    socketT?.emit("send",JSON.stringify(v)); 
  }
  return (
    <Row justify={`center`}>
      <Col xs={24} sm={24} md={16} lg={12}>
        <Card>
          <Form layout='vertical' onFinish={HandelSend}>
            <Row gutter={[8,8]}>
              <Col span={24}>
                <Form.Item
                name={'amount'}
                label={'Amount'}
                rules={[{required:true,message:'Required'}]}
                >
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                name={'name'}
                label={'Name'}
                rules={[{required:true,message:'Required'}]}
                >
                  <Input type='text' />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item >
                  <Button htmlType='submit' >Send</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default Send