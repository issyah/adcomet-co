import CompanyComponent from "@/src/CompanyComponent";
import AuthOwnerLayout from "@/src/layout/AuthOwnerLayout";

export default function Company() {
  return <CompanyComponent />;
}

Company.getLayout = (page) => <AuthOwnerLayout>{page}</AuthOwnerLayout>;
