import AuthLayout from "@/src/layout/AuthLayout";
import UsersComponent from "@/src/UsersComponent";

export default function Users() {
  return <UsersComponent />;
}

Users.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;
