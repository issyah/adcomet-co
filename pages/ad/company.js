import AuthLayout from "@/src/layout/AuthLayout";
import CompanyComponent from "@/src/CompanyComponent";

export default function Company() {
  return <CompanyComponent />;
}

Company.getLayout = (page) => <AuthLayout>{page}</AuthLayout>