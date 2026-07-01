import { useEffect, useState } from "react";
import "./App.css";

const languages = [
  { code: "en", name: "Inglês" },
  { code: "es", name: "Espanhol" },
  { code: "fr", name: "Francês" },
  { code: "de", name: "Alemão" },
  { code: "it", name: "Italiano" },
  { code: "pt", name: "Português" },
];

function App() {
  const [sourceLang, setSourceLang] = useState("pt");
  const [targetLang, setTargetLang] = useState("en");
  const [sourceText, setSourceText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [translatedText, setTranslatedText] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const handleTranslate = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://api.mymemory.translated.net/get?q=${sourceText}&langpair=${sourceLang}|${targetLang}`,
        );

        if (!res.ok) {
          throw new Error(`${res.status}`);
        }

        const data = await res.json();

        setTranslatedText(data.responseData.translatedText);

        if (isError) {
          setIsError(false);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (sourceText) {
      const delay = setTimeout(() => {
        handleTranslate();
      }, 500);

      return () => clearTimeout(delay);
    } else {
      setTranslatedText("");
    }
  }, [sourceText]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center">
          <span className="text-primary text-xl font-bold">
            Tradutor Síntese Jr.
          </span>
        </div>
      </header>

      <main className="grow flex items-start justify-center px-4 py-8 bg-background">
        <div className="w-full max-w-5xl bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="text-sm bg-transparent border-none focus:outline-none cursor-pointer"
            >
              {languages.map((lang) => (
                <option value={lang.code} key={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>

            <button className="p-2 rounded-full hover:bg-gray-100 outline-none">
              <svg
                className="w-4 h-4 text-header-color cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.02 10q-.015 0 0 0H16zM2 6h13.58l-2.29 2.29a1 1 0 0 0-.3.71 1.003 1.003 0 0 0 1.71.71l4-4c.18-.18.29-.43.29-.71s-.11-.53-.29-.71l-4-4a1.003 1.003 0 0 0-1.42 1.42L15.58 4H2c-.55 0-1 .45-1 1s.45 1 1 1m2 4h-.02zm14 4H4.42l2.29-2.29a1 1 0 0 0 .3-.71 1.003 1.003 0 0 0-1.71-.71l-4 4c-.18.18-.29.43-.29.71s.11.53.29.71l4 4a1.003 1.003 0 0 0 1.42-1.42L4.42 16H18c.55 0 1-.45 1-1s-.45-1-1-1" />
              </svg>
            </button>

            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="text-sm bg-transparent border-none focus:outline-none cursor-pointer"
            >
              {languages.map((lang) => (
                <option value={lang.code} key={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-4">
              <textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                className="w-full h-40 text-lg text-text-color bg-transparent resize-none outline-none"
                placeholder="Digite seu texto..."
              ></textarea>
            </div>

            <div className="p-4 relative bg-secondary-background border-l border-gray-200">
              <div className="absolute inset-0 flex items-center justify-center ">
                {isLoading ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
                ) : isError ? (
                  <div className="p-4 bg-red-100 border-red-400 text-red-700">
                    Não foi possível traduzir a mensagem.
                  </div>
                ) : (
                  <p className="text-lg text-text-color">{translatedText}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-5xl mx-auto px-4 py-3 text-sm text-header-color">
          &copy; {new Date().getFullYear()} Tradutor Síntese Jr.
        </div>
      </footer>
    </div>
  );
}

export default App;
