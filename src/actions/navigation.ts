"use server";

import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";

export async function GoDashboardAction() {
  const locale = await getLocale();
  redirect(`/${locale}/app/card-editor`);
}
export async function GoResumesAction() {
  const locale = await getLocale();
  redirect(`/${locale}/app/dashboard/resumes`);
}
export async function GoTemplatesAction() {
  const locale = await getLocale();
  redirect(`/${locale}/app/dashboard/templates`);
}
