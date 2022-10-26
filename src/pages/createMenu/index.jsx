import { Button, Form, Input } from 'antd'
const { ipcRenderer } = require('electron')
function CreateMenu() {
  function onSubmit(values) {
    ipcRenderer.send('createMenu', values)
  }
  return <div className='py-5 px-5 w-4/5'>
    <Form
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 15 }}
      labelAlign="left"
      requiredMark={false}
      autoComplete="off"
      onFinish={onSubmit}
    >
      <Form.Item
        label="导航名称"
        name="title"
        rules={[{ required: true, message: '导航名不能为空' }]}
      >
        <Input placeholder='请输入导航名' />
      </Form.Item>
      <Form.Item
        label="URL链接"
        name="link"
        extra="同时也是mark文件路径,自动加上.md后缀"
        rules={[{ required: true, message: '链接地址不能为空' }]}
      >
        <Input addonBefore="/" placeholder='请输入链接地址' />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 5 }}>
        <Button type='primary' htmlType="submit">确认</Button>
      </Form.Item>
    </Form>
  </div>
}

export default CreateMenu