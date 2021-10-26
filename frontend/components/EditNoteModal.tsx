import { Button, Modal, Form, Input, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface Values {
  title: string;
  body: string;
}

interface EditNoteModalProps {
  visible: boolean;
  onCreate: (values: Values) => Promise<void>;
  onCancel: () => void;
  updateLoading: boolean;
  deleteLoading: boolean;
  title: string;
  body: string;
}

const EditNoteModal: React.FC<EditNoteModalProps> = ({
  visible,
  onCreate,
  onCancel,
  updateLoading,
  deleteLoading,
  title,
  body,
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
          onClick={handleOk}
          danger
          style={{
            float: 'left',
          }}
        >
          {deleteLoading ? "Delete" : <><DeleteOutlined /> Delete</>}          
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
          <Input disabled={updateLoading || deleteLoading} />
        </Form.Item>
        <Form.Item name="body" label="Body">
          <Input.TextArea rows={3} disabled={updateLoading || deleteLoading} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditNoteModal;
