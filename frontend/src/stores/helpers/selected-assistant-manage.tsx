type ClientTypes = {
  assistantId: string | null;
  code: string;
  createdAt: Date;
  id: string;
  name: string;
  network: string;
};

type SelectedAssistantTypes = {
  createdAt: Date;
  email: string;
  id: string;
  name: string;
  phone: string;
  Client: ClientTypes[];
};

export const linkAssistantClient = (
  selectedAssistant: SelectedAssistantTypes | null,
  clients: ClientTypes[],
) => {
  if (!selectedAssistant) {
    return null;
  }

  return {
    ...selectedAssistant,
    Client: [...clients, ...selectedAssistant.Client],
  };
};

export const unlinkAssistantClient = (
  selectedAssistant: SelectedAssistantTypes | null,
  ids: string[],
) => {
  if (!selectedAssistant) {
    return null;
  }

  const filteredClients = selectedAssistant?.Client?.filter(
    (client) => !ids.includes(client.id),
  );

  return {
    ...selectedAssistant,
    Client: [...filteredClients],
  };
};
