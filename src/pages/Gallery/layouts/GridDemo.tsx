import React from 'react';
import { Grid } from '@/components/layouts/Grid';
import { DemoBlock } from '../components/DemoBlock';

const { Row, Col } = Grid;

export const GridDemo: React.FC = () => {
  const colStyle = {
    background: '#0092ff',
    padding: '8px 0',
    textAlign: 'center' as const,
    color: '#fff',
    borderRadius: '4px',
  };

  const colStyleLight = {
    ...colStyle,
    background: '#69c0ff',
  };

  return (
    <div className="space-y-8">
      <DemoBlock 
        title="基础栅格" 
        description="使用 Row 和 Col 的基础栅格系统。"
        code={`<Row>
  <Col span={24}>col-24</Col>
</Row>
<Row>
  <Col span={12}>col-12</Col>
  <Col span={12}>col-12</Col>
</Row>
<Row>
  <Col span={8}>col-8</Col>
  <Col span={8}>col-8</Col>
  <Col span={8}>col-8</Col>
</Row>
<Row>
  <Col span={6}>col-6</Col>
  <Col span={6}>col-6</Col>
  <Col span={6}>col-6</Col>
  <Col span={6}>col-6</Col>
</Row>`}
      >
        <div className="space-y-4">
          <Row>
            <Col span={24}><div style={colStyle}>col-24</div></Col>
          </Row>
          <Row>
            <Col span={12}><div style={colStyle}>col-12</div></Col>
            <Col span={12}><div style={colStyleLight}>col-12</div></Col>
          </Row>
          <Row>
            <Col span={8}><div style={colStyle}>col-8</div></Col>
            <Col span={8}><div style={colStyleLight}>col-8</div></Col>
            <Col span={8}><div style={colStyle}>col-8</div></Col>
          </Row>
          <Row>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
            <Col span={6}><div style={colStyleLight}>col-6</div></Col>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
            <Col span={6}><div style={colStyleLight}>col-6</div></Col>
          </Row>
        </div>
      </DemoBlock>

      <DemoBlock 
        title="区块间隔" 
        description="带有间隔的栅格。"
        code={`<Row gutter={16}>
  <Col span={6}><div style={colStyle}>col-6</div></Col>
  <Col span={6}><div style={colStyle}>col-6</div></Col>
  <Col span={6}><div style={colStyle}>col-6</div></Col>
  <Col span={6}><div style={colStyle}>col-6</div></Col>
</Row>`}
      >
        <Row gutter={16}>
          <Col span={6}><div style={colStyle}>col-6</div></Col>
          <Col span={6}><div style={colStyleLight}>col-6</div></Col>
          <Col span={6}><div style={colStyle}>col-6</div></Col>
          <Col span={6}><div style={colStyleLight}>col-6</div></Col>
        </Row>
      </DemoBlock>

      <DemoBlock 
        title="对齐" 
        description="Flex 对齐选项。"
        code={`<Row justify="center">...</Row>
<Row justify="space-between">...</Row>
<Row justify="end">...</Row>`}
      >
        <div className="space-y-4">
            <p className="text-sm text-gray-500">居中对齐 (Center)</p>
            <Row justify="center" className="bg-gray-100 p-2 rounded">
                <Col span={4}><div style={colStyle}>col-4</div></Col>
                <Col span={4}><div style={colStyleLight}>col-4</div></Col>
            </Row>

            <p className="text-sm text-gray-500">两端对齐 (Space Between)</p>
            <Row justify="space-between" className="bg-gray-100 p-2 rounded">
                <Col span={4}><div style={colStyle}>col-4</div></Col>
                <Col span={4}><div style={colStyleLight}>col-4</div></Col>
                <Col span={4}><div style={colStyle}>col-4</div></Col>
            </Row>
        </div>
      </DemoBlock>
    </div>
  );
};
