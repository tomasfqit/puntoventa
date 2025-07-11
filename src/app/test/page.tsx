export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Test de Tailwind CSS
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-500 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-xl">1</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Colores
            </h3>
            <p className="text-gray-600">
              Verificando que los colores de Tailwind CSS funcionen correctamente.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-500 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-xl">2</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Espaciado
            </h3>
            <p className="text-gray-600">
              Verificando que el sistema de espaciado funcione correctamente.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-500 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-xl">3</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Responsive
            </h3>
            <p className="text-gray-600">
              Verificando que el diseño responsive funcione correctamente.
            </p>
          </div>
        </div>

        {/* Botones de prueba */}
        <div className="mt-12 text-center space-x-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            Botón Primario
          </button>
          <button className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            Botón Secundario
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            Botón Destructivo
          </button>
        </div>

        {/* Mensaje de éxito */}
        <div className="mt-8 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
          <p className="font-semibold">¡Tailwind CSS está funcionando correctamente!</p>
          <p className="text-sm mt-1">
            Si puedes ver esta página con estilos, significa que la configuración es correcta.
          </p>
        </div>
      </div>
    </div>
  );
} 