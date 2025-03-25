import { useHttp } from "@/hooks/useHttp";
import { RulesType } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

interface RulesContextType {
  rules: RulesType[];
  loading: boolean;
  error: string | null;
}

const RulesContext = createContext<RulesContextType | undefined>(undefined);

const RulesProvider = ({ children }: { children: React.ReactNode }) => {
  const { request } = useHttp();
  const [rules, setRules] = useState<RulesType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    request("/additional/rules/", "GET", null)
      .then((res: RulesType[]) => setRules(res))
      .catch(() => {
        setError("Произошла непредвиденная ошибка. Перезагрузите страницу.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <RulesContext.Provider value={{ rules, loading, error }}>
      {children}
    </RulesContext.Provider>
  );
};

const useRules = () => {
  const context = useContext(RulesContext);
  if (!context) {
    throw new Error(
      "useRules должен использоваться внутри компонента RulesProvider"
    );
  }
  return context;
};

export { RulesProvider, useRules };
