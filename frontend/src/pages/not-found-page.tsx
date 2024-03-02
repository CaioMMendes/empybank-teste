import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3">
      <h1 className="text-3xl font-semibold">Página não encontrada</h1>
      <Link to={"/"}>
        <Button className="rounded-lg px-5 py-2 text-base">
          Voltar a tela inicial
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
