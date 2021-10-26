import { Button, Modal, Form, Input, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';

interface Values {
  title: string;
  body: string;
}

interface EditNoteModalProps {
  visible: boolean;
  onUpdate: (title: string, body: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onCancel: () => void;
  updateLoading: boolean;
  deleteLoading: boolean;
  title: string;
  body: string;
  noteId: string;
}

const EditNoteModal: React.FC<EditNoteModalProps> = ({
  visible,
  onUpdate,
  onDelete,
  onCancel,
  updateLoading,
  deleteLoading,
  title,
  body,
  noteId,
}) => {
  const [form] = Form.useForm();
  const initialValues = {
    title,
    body,
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        await onUpdate(values.title, values.body);
        form.resetFields();
        message.success('Note updated');
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleDelete = async () => {
    await onDelete(noteId);
    message.success('Note deleted');
  };

  return (
    <Modal
      visible={visible}
      title="Edit note"
      okText="Update"
      cancelText="Cancel"
      confirmLoading={updateLoading || deleteLoading}
      onCancel={onCancel}
      onOk={handleOk}
      footer={[
        <Button
          key="link"
          type="default"
          loading={deleteLoading}
          onClick={handleDelete}
          danger
          style={{
            float: 'left',
          }}
        >
          {deleteLoading ? (
            'Delete'
          ) : (
            <>
              <DeleteOutlined /> Delete
            </>
          )}
        </Button>,
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={updateLoading}
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
        initialValues={initialValues}
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
          <Input autoComplete="off" disabled={updateLoading || deleteLoading} />
        </Form.Item>
        <Form.Item name="body" label="Body">
          <Input.TextArea rows={3} disabled={updateLoading || deleteLoading} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditNoteModal;
