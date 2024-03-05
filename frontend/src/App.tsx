import AssistantClientsSection from "./components/assistant-clients-section/assistant-clients-section";
import AssistantRegister from "./components/assistant-register/assistant-register";
import AssistantSelect from "./components/assistant-select/assistant-select";
import Sidebar from "./components/sidebar/sidebar";
import { Label } from "./components/ui/label";
import UnlinkedClientsSection from "./components/unlinked-clients-section/unlinked-clients-section";

function App() {
  return (
    <div className="flex h-full w-full flex-1 bg-layout-body ">
      <Sidebar />
      <main className="flex w-full flex-col gap-6 p-2 md:p-8">
        <header className="mb-2 text-[1.75rem] font-bold leading-8 text-content-title">
          Carteira de Clientes
        </header>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="triggerCommercialAssistant"
            className="text-sm leading-4 text-content-title"
          >
            Selecione o Assistente Comercial
          </Label>
          <div className="flex w-full gap-2">
            <AssistantSelect />
            <AssistantRegister />
          </div>
        </div>
        <div className="grid w-full grid-rows-2 gap-[1.125rem] md:grid-cols-2 md:grid-rows-1">
          <UnlinkedClientsSection />
          <AssistantClientsSection />
        </div>
      </main>
    </div>
  );
}

export default App;
