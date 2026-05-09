import { getParfumBySlug, parfums } from "@/lib/data/perfumes";
import { notFound } from "next/navigation";
import { DuftDetailClient } from "./DuftDetailClient";

export async function generateStaticParams() {
  return parfums.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const parfum = getParfumBySlug(slug);
  if (!parfum) return {};
  return {
    title: `${parfum.name} – ${parfum.marke}`,
    description: parfum.kurzBeschreibung,
  };
}

export default async function DuftDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const parfum = getParfumBySlug(slug);
  if (!parfum) notFound();
  return <DuftDetailClient parfum={parfum} />;
}
