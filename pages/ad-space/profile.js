import AuthOwnerLayout from "@/src/layout/AuthOwnerLayout";
import ProfileComponent from "@/src/ProfileComponent";

export default function Profile() {
  return <ProfileComponent />;
}

Profile.getLayout = (page) => <AuthOwnerLayout>{page}</AuthOwnerLayout>;
