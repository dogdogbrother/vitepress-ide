import { Button, Checkbox, Form, Input } from 'antd'

function CreateMenu() {
  return <div className='py-5 px-5'>
    <Form
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 15 }}
      labelAlign="left"
      requiredMark={false}
    >
      <Form.Item
        label="导航名"
        name="title"
        rules={[{ required: true, message: '请输入导航名' }]}
      >
        <Input />
      </Form.Item>
    </Form>
    CreateMenu
  </div>
}

export default CreateMenu