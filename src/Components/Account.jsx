import { FaPen } from 'react-icons/fa';

const Account = ({ name, balance, currency, icon, backgroundColor }) => {
    return (
        <div className={`p-1 md:p-2 md:gap-2 flex flex-col md:flex-row rounded-md items-center text-white bg-[${backgroundColor}] relative group cursor-pointer`} style={{ backgroundColor: backgroundColor }}>
            <div className="flex items-center justify-center">{icon}</div>
            <div className="flex flex-col md:gap-3 gap-1 text-white">
                <span className="text-white font-semibold">{name}</span>
                <span className="font-bold text-2xl">{currency} {balance}</span>
            </div>

            <div className='absolute hidden top-2 right-2 group-hover:block'>
                <FaPen />
            </div>
        </div>
    )
}

export default Account