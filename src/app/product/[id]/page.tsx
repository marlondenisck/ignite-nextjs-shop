
"use client";
import { useParams } from "next/navigation";
export default function ProdutoPage() {
  const params = useParams();
  return (
    <div>
      <h1>Produto ID: {params.id}</h1>
    </div>
  );
}