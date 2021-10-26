import React, { useState } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNotes } from '../lib/useNotes';

interface Values {
  title: string;
  body: string;
  modifier: string;
}

interface NoteCreateFormProps {
  visible: boolean;
  onCreate: (values: Values) => Promise<void>;
  onCancel: () => void;
  confirmLoading: boolean;
}

const NoteCreateForm: React.FC<NoteCreateFormProps> = ({
  visible,
  onCreate,
  onCancel,
  confirmLoading
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="Create a new note"
      okText="Create"
      cancelText="Cancel"
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(async (values) => {            
            await onCreate(values);
            form.resetFields();
            message.success('Note created');
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ title: '', body: '' }}
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

const CreateNote: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const { createNote } = useNotes();
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const onCreate = async (values: { title: string; body: string }) => {
    setConfirmLoading(true);
    await createNote(values.title.trim(), values.body.trim());    
    setConfirmLoading(false);
    setVisible(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        <PlusOutlined />
        New Note
      </Button>
      <NoteCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
        confirmLoading={confirmLoading}
      />
    </div>
  );
};

export default CreateNote;
