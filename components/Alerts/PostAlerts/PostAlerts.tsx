import { Alert } from "@mantine/core";
import { AlertCircle } from "tabler-icons-react";

export function PostWarningAlert({ alertMessage }: any) {
  return (
    <div className="p-2">
      <Alert
        icon={<AlertCircle size={16} />}
        title="Bummer!"
        color="red"
        radius="md"
      >
        {alertMessage}
      </Alert>
    </div>
  );
}
