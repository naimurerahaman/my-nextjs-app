import Link from "next/link";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function UserPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div style={{ padding: "50px" }}>
      <h1>User Page</h1>
      <p style={{ fontSize: "20px", color: "blue" }}>
        User ID: <strong>{id}</strong>
      </p>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "#f0f0f0",
          borderRadius: "8px",
        }}
      >
        <p>
          <strong>Try these links:</strong>
        </p>
        <div style={{ marginTop: "10px" }}>
          <Link href="/user/1">User 1</Link> |{" "}
          <Link href="/user/2">User 2</Link> |{" "}
          <Link href="/user/3">User 3</Link> |{" "}
          <Link href="/user/100">User 100</Link>
        </div>
      </div>

      <p style={{ marginTop: "30px" }}>
        <Link href="/">← Go back home</Link>
      </p>
    </div>
  );
}
