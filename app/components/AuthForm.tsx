interface AuthFormProps {
    email: string;
    password: string;
    error: string | null;
    loading: boolean;
    setEmail: (value: string) => void;
    setPassword: (value: string) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
    email,
    password,
    error,
    loading,
    setEmail,
    setPassword,
    handleSubmit,
}) => {
    return (
        <form onSubmit={handleSubmit} className="mt-10">
            {error && <p className="text-[#FED0BB] text-center">{error}</p>}

            <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full border-none bg-[#FCB9B2] h-11 rounded-xl shadow-lg hover:bg-[#B23A48] focus:bg-[#B23A48] focus:ring-0 placeholder-black"
                />
            </div>

             <div className="mt-7">
                <input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full border-none bg-[#FCB9B2] h-11 rounded-xl shadow-lg hover:bg-[#B23A48] focus:bg-[#B23A48] focus:ring-0 placeholder-black"
                />
            </div>

            <div className="mt-7">
                <button
                  type="submit"
                  className="bg-[#8C2F39] w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                >
                {loading ? "Cargando... " : "Login"}
                </button>
            </div>
        </form>
    );
};

export default AuthForm;