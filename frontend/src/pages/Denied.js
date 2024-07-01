import AuthForm from '../components/AuthForm';

function Login() {

    return (
        <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#2e2157]">
            <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
                <div className="h-full w-full flex flex-col md:flex-row items-center justify-center">
                    
                    <div className="w-full md:w-1/2 flex flex-col items-center justify-start gap-5 md:gap-y-10 2xl:-mt-20">
                        
                        <div className="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-left text-[#5fdaa4]">
                            <h1>
                            <span>task manager</span><br/>
                            <span>frontend</span>
                            </h1>
                            <p className="gap-1 py-1 text-sm uppercase font-normal tracking-wide md:text-base text-gray-50">Gerencie suas tarefas diárias facilmente</p>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 p-4 md:p-1 flex flex-col justify-center items-center">
                        <AuthForm />
                    </div>

                </div>
            </div>



        </div>
    )
}

export default Login;