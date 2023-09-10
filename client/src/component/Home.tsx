import { Button, Col, Row, Space } from 'antd'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <Row gutter={[16,16]}>
      <Col span="12">
      <Space>
        <Link to={'/recieve'}> <Button>Recive</Button></Link>
        <Link to={'/send'}><Button>Send</Button> </Link>
      </Space>
      </Col>
    </Row>
  )
}

export default Home