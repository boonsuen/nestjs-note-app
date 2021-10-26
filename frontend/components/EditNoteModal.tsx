import React, { useState } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNotes } from '../lib/useNotes';

interface Values {
  title: string;
  body: string;
}

interface EditNoteModalProps {
  visible: boolean;
  onCreate: (values: Values) => Promise<void>;
  onCancel: () => void;
  confirmLoading: boolean;
  title: string;
  body: string;
  noteId: string;
}

const EditNoteModal: React.FC<EditNoteModalProps> = ({
  visible,
  onCreate,
  onCancel,
  confirmLoading,
  title,
  body,
  noteId,
}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        await onCreate(values);
        form.resetFields();
        message.success('Note updated');
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      visible={visible}
      title="Edit a new note"
      okText="Update"
      cancelText="Cancel"
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onOk={handleOk}
      footer={[
        <Button
          key="link"
          href="https://google.com"
          type="default"
          loading={confirmLoading}
          onClick={handleOk}
          danger
          style={{
            float: 'left',
          }}
        >
          <DeleteOutlined /> Delete
        </Button>,
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={confirmLoading}
          onClick={handleOk}
        >
          Update
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ title, body }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: 'Please input the title of note!',
            },
          ]}
        >
          <Input disabled={confirmLoading} />
        </Form.Item>
        <Form.Item name="body" label="Body">
          <Input.TextArea rows={3} disabled={confirmLoading} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditNoteModal;
