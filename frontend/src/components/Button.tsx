
interface ButtonProps {
    estilo?: 'primary' | 'secondary',
    children: React.ReactNode,
    type?: 'button' | 'reset' | 'submit',
    className?: string,
    onClick?: () => void,
    disabled?: boolean,
}

const Button = ({ estilo = 'primary', children, type = 'button', className, onClick, disabled = false }: ButtonProps) => {

    const estilos = {
        primary: 'bg-indigo-500 border border-indigo-500 text-white hover:bg-indigo-700 hover:border-indigo-700',
        secondary: 'bg-transparent border border-indigo-700 text-indigo-700 hover:bg-indigo-700 hover:text-white'
    }

    return (
        <button
            className={`py-1.5 px-4 rounded-lg text-sm disabled:cursor-not-allowed disabled:opacity-60 ${estilos[estilo]} ${className ?? ""}`} type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button;
