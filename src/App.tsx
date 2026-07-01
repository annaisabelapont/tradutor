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
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center">
          <span className="text-header-primary text-xl font-bold">
            Tradutor Síntese Jr.
          </span>
        </div>
      </header>

      <main className="grow flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-5xl bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <select className="text-sm bg-transparent border-none focus:outline-none cursor-pointer">
              {languages.map((lang) => (
                <option value={lang.code} key={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
              <textarea name="" id=""></textarea>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
