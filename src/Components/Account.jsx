const Account = ({name,balance,currency,icon,backgroundColor}) => {
    return (
        <div className={`p-2 gap-2 flex flex-col md:flex-row rounded-md items-center text-white bg-[${backgroundColor}]`} style={{ backgroundColor: backgroundColor }}>
            <div>{icon}</div>
            <div className="flex flex-col gap-3 text-white">
                <span className="text-white font-semibold">{name}</span>
                <span className="font-bold text-2xl">{currency} {balance}</span>
            </div>
        </div>
    )
}

export default Account