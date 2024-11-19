type ErrorTypeProps = {
  message: string;
};

export default function ErrorMessage({
  message,
}: ErrorTypeProps): React.ReactElement {
  return (
    <div>
      <p>{message}</p>
    </div>
  );
}
