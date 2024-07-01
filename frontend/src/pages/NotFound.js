import { Link } from "react-router-dom";

function PageNotFound() {
    return (
        <div className="w-full min-h-screen  flex items-center justify-center flex-col lg:flex-row bg-[#2e2157]">
            <div className="w-1/2 flex flex-col items-center justify-center">
                <h1 className="text-[#5fdaa4] font-bold text-6xl text-center">Página não encontrada</h1>
                <p className="text-white text-2xl text-center mt-2">Sentimos muito mas parece que o endereço que você está procurando não está disponível, para voltar clique { <Link className='text-[#5fdaa4]' to='/'>aqui</Link> } </p>
            </div>

        </div>
    );
}

export default PageNotFound;