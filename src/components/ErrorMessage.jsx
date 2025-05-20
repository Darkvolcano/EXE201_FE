import { Typography } from "antd";

const { Text } = Typography;

const ErrorMessage = ({ message }) => <Text type="danger">{message}</Text>;

export default ErrorMessage;