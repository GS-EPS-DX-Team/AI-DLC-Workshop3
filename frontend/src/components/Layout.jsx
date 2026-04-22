import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
