//Loader Spinner que utiulizaremos en caso de que cualquier respuesta tarde más de lo nornal o simplemente cargue
const Loader = () => {
  return (
    <div className="flex justify-center items-center py-3">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-700" />
    </div>
  );
};

export default Loader;
