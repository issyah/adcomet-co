import AuthLayout from "@/src/layout/AuthLayout";
import ProfileComponent from "@/src/ProfileComponent";

export default function Profile() {
  return <ProfileComponent />;
}

Profile.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;
