import AuthOwnerLayout from "@/src/layout/AuthOwnerLayout";
import UsersComponent from "@/src/UsersComponent";

export default function Users({}) {
  return <UsersComponent />;
}

Users.getLayout = (page) => <AuthOwnerLayout>{page}</AuthOwnerLayout>;
