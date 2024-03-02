import {
  PiArrowCircleLeft,
  PiArrowCircleRight,
  PiMagnifyingGlass,
} from "react-icons/pi";
import AssistantRegister from "./components/assistant-register/assistant-register";
import ClientRegister from "./components/client-register/client-register";
import Sidebar from "./components/sidebar/sidebar";
import { Button } from "./components/ui/button";
import {
  Input,
  InputContainer,
  InputIconContainer,
  InputLabel,
  InputLabelText,
  InputWithIcon,
} from "./components/ui/input";
import { Label } from "./components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

function App() {
  return (
    <div className="flex h-full w-full flex-1 bg-layout-body ">
      <Sidebar />
      <main className="flex w-full flex-col gap-6 p-8">
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
            <Select
              name="selectCommercialAssistant"
              defaultValue={undefined}
              onValueChange={(e) => console.log(e)}
            >
              <SelectTrigger
                className="w-full max-w-96 flex-nowrap truncate rounded-xl p-3 text-base leading-none"
                name="triggerCommercialAssistant"
                //todo não funciona a label
                // id="triggerCommercialAssistant"
              >
                <SelectValue
                  placeholder={`Selecione um assistente comercial`}
                />
              </SelectTrigger>
              <SelectContent
                ref={(ref) => {
                  if (!ref) return;
                  ref.ontouchstart = (e) => {
                    e.preventDefault();
                  };
                }}
              >
                <SelectGroup className="max-h-80 ">
                  <SelectItem value="team1">Equipe 1</SelectItem>
                  <SelectItem value="team2">Equipe 1</SelectItem>
                  <SelectItem value="team3">Equipe 3</SelectItem>
                  <SelectItem value="team4">Equipe 4</SelectItem>
                  <SelectItem value="team4">Equipe 4</SelectItem>
                  <SelectItem value="team4">Equipe 4</SelectItem>
                  <SelectItem value="team4">Equipe 4</SelectItem>
                  <SelectItem value="team4">Equipe 4</SelectItem>
                  <SelectItem value="team4">Equipe 4</SelectItem>
                  <SelectItem value="team4">Equipe 4</SelectItem>
                  <SelectItem value="team4">Equipe 4</SelectItem>
                  <SelectItem value="team4">Equipe 4</SelectItem>
                  <SelectItem value="team4">Equipe 4</SelectItem>
                  <SelectItem value="team444">
                    Equipe 4 casc aasc asc a cascasc asac asc asc asca cascasc
                    asac asc asc asca cascasc asac asc asc asca cascasc asac asc
                    asc asca cascasc asac asc asc asca cascasc asac asc asc asca
                    cascasc asac asc asc asca asc asc asca asc asc asca asc asc
                    asca asc asc ascasc asc ascasc asc asca
                  </SelectItem>
                  <SelectItem value="team43333">
                    Equipe 4
                    casaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {/* <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size={"iconLarge"}>
                    <PiPlusCircle size={22} />
                  </Button>
                </AlertDialogTrigger> */}
            {/* </AlertDialog> */}
            <AssistantRegister />
            {/* <LoadingOverlay>
                <Loading className="z-100 absolute inset-0  size-6 translate-x-1/2 translate-y-1/2 bg-red-600" />
              </LoadingOverlay> */}
          </div>
        </div>

        {/* //todo dar o nome deste componente de client-section */}
        <div className="bg- flex flex-col gap-4 rounded-[1.125rem] bg-layout-surface p-6">
          {/* header */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-4 ">
              <h2>Clientes (Não vinculados)</h2>
              <span className="flex items-center justify-center rounded-full px-3 text-sm text-primary ring-1 ring-interactive-secondary">
                23
              </span>
            </div>
            <div className="flex w-fit items-center gap-2">
              <ClientRegister />
              <Button variant={"secondary"} className="flex items-center">
                Vincular <PiArrowCircleRight size={15} />
              </Button>
            </div>
          </div>

          {/* search */}
          <InputIconContainer Icon={PiMagnifyingGlass}>
            <InputWithIcon placeholder="Buscar" />
          </InputIconContainer>
        </div>

        <div className="flex flex-col">
          <Button
            variant={"destructive"}
            className="rounded-lg leading-[150%] "
          >
            Desvincular
            <PiArrowCircleLeft size={15} />{" "}
          </Button>
          teste
          <InputContainer error={true} errorMessage="ocorreu um erro">
            <InputLabel>
              <InputLabelText>Código do Cliente</InputLabelText>
              <Input placeholder="Testando" error={true} />
            </InputLabel>
          </InputContainer>
          <InputIconContainer Icon={PiMagnifyingGlass}>
            <InputWithIcon placeholder="Testando" error={true} />
          </InputIconContainer>
        </div>
      </main>
    </div>
  );
}

export default App;
