import Account from "./Account"
import BalanceTrendCard from "./BalanceTrend/BalanceTrendCard"
import CashFlowCard from "./CashFlowCard/CashFlowCard"
import ExpenseStructureCard from "./ExpenseStructure/ExpenseStructure"
import Navigation from "./Navigation"
import CashReserveModal from './CashReserveModal'
import { useState } from "react"


const Dashboard = () => {
    const [modalIsOpen,setModalIsOpen] = useState(false)

    function openModal() {
        console.log(`Setting isOpen to true`);
        setModalIsOpen(true);
    }

    // function afterOpenModal() {
    //     subtitle.style.color = '#000';
    // }

    function closeModal() {
        setModalIsOpen(false);
    }
    const cashIcon = <svg width="40px" height="40px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">

        <g id="a" />

        <g id="b">


            <path
                d="M14.44,33c-2.4,0-4.33,1.93-4.33,4.33s1.93,4.33,4.33,4.33v8.67c-2.4,0-4.33,1.94-4.33,4.34s1.93,4.33,4.33,4.33h20.3c1,0,1.93-.34,2.66-.91l-1.92-18.93-6.9-6.17H14.44Z"
                fill="white" fill-rule="evenodd" />

            <path
                d="M26.04,50.33H14.45c-2.4,0-4.34-1.93-4.34-4.33s1.93-4.33,4.34-4.33h9.94l1.65,8.67Z"
                fill="white" fill-rule="evenodd" />

            <circle cx="39.08" cy="43.39" fill="white" r="14.81"
                transform="translate(-15.15 21.73) rotate(-26.22)" />

            <circle cx="39.08" cy="43.39" fill="white" r="8.12" />

            <circle cx="30.02" cy="19.81" fill="white" r="8.12"
                transform="translate(8.18 48.38) rotate(-86.02)" />

            <path
                d="M39.08,28.58c-.67,0-1.33,.05-1.99,.14,7.32,1.01,12.78,7.27,12.78,14.67,0,7.4-5.47,13.66-12.8,14.66,.67,.09,1.34,.14,2.01,.14,8.18,0,14.81-6.63,14.81-14.81s-6.63-14.81-14.81-14.81Z"
                fill="white" fill-rule="evenodd" />

            <path
                d="M39.08,35.27c-.46,0-.9,.04-1.34,.11,3.85,.64,6.79,3.98,6.79,8.01s-2.94,7.37-6.79,8.01c.43,.07,.88,.11,1.34,.11,4.49,0,8.12-3.64,8.12-8.12s-3.63-8.12-8.12-8.12Z"
                fill="white" fill-rule="evenodd" />

            <path
                d="M30.02,11.69c-.44,0-.87,.04-1.29,.1,3.87,.62,6.83,3.97,6.83,8.02s-2.96,7.4-6.83,8.02c.42,.07,.85,.1,1.29,.1,4.49,0,8.12-3.63,8.12-8.12s-3.64-8.12-8.12-8.12Z"
                fill="white" fill-rule="evenodd" />

            <path
                d="M43.33,28.23c1.59-2.52,2.5-5.44,2.5-8.42,0-8.72-7.09-15.81-15.81-15.81s-15.81,7.09-15.81,15.81c0,4.81,2.17,9.22,5.79,12.19h-5.56c-2.94,0-5.33,2.39-5.33,5.33,0,1.79,.89,3.37,2.25,4.33-1.36,.97-2.25,2.55-2.25,4.33s.89,3.37,2.25,4.33c-1.35,.97-2.25,2.54-2.25,4.33,0,2.94,2.39,5.33,5.33,5.33h20.3c1.07,0,2.08-.35,2.95-.94,.46,.04,.91,.14,1.38,.14,8.72,0,15.81-7.09,15.81-15.81,0-7.24-4.91-13.29-11.56-15.15Zm-27.12-8.42c0-7.61,6.19-13.81,13.81-13.81s13.81,6.19,13.81,13.81c0,2.86-.93,5.66-2.59,7.99-.71-.1-1.42-.22-2.16-.22-4.23,0-8.07,1.7-10.91,4.42h-4.62c-4.53-2.4-7.34-7.04-7.34-12.19Zm-5.1,17.52c0-1.84,1.5-3.33,3.33-3.33h12c-1.44,1.94-2.46,4.19-2.89,6.67H14.44c-1.84,0-3.33-1.5-3.33-3.33Zm3.33,12c-1.84,0-3.33-1.5-3.33-3.33s1.5-3.33,3.33-3.33h8.91c-.01,.25-.07,.48-.07,.72,0,2.1,.43,4.11,1.18,5.94H14.44Zm0,8.67c-1.84,0-3.33-1.5-3.33-3.33s1.5-3.33,3.33-3.33h11.05c1.74,2.97,4.38,5.35,7.6,6.67H14.44Zm24.64-.8c-7.61,0-13.81-6.19-13.81-13.81s6.15-13.81,13.81-13.81,13.81,6.19,13.81,13.81-6.19,13.81-13.81,13.81Z" />

            <path
                d="M39.08,34.27c-5.03,0-9.12,4.09-9.12,9.12s4.09,9.12,9.12,9.12,9.12-4.09,9.12-9.12-4.09-9.12-9.12-9.12Zm0,16.24c-3.93,0-7.12-3.2-7.12-7.12s3.2-7.12,7.12-7.12,7.12,3.19,7.12,7.12-3.19,7.12-7.12,7.12Z" />

            <path
                d="M30.02,28.93c5.03,0,9.12-4.09,9.12-9.12s-4.09-9.12-9.12-9.12-9.12,4.09-9.12,9.12,4.09,9.12,9.12,9.12Zm0-16.24c3.93,0,7.12,3.2,7.12,7.12s-3.2,7.12-7.12,7.12-7.12-3.19-7.12-7.12,3.19-7.12,7.12-7.12Z" />

            <path
                d="M30.02,20.81c.4,0,.72,.32,.72,.72s-.32,.72-.72,.72c-.19,0-.37-.08-.51-.21-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41c.27,.27,.58,.46,.92,.6v.28c0,.55,.45,1,1,1s1-.45,1-1v-.29c1.01-.4,1.72-1.37,1.72-2.52,0-1.5-1.22-2.72-2.72-2.72-.4,0-.72-.32-.72-.72s.32-.72,.72-.72c.19,0,.38,.08,.51,.21,.39,.39,1.02,.39,1.41,0s.39-1.02,0-1.41c-.27-.27-.58-.46-.92-.6v-.28c0-.55-.45-1-1-1s-1,.45-1,1v.29c-1,.4-1.72,1.37-1.72,2.52,0,1.5,1.22,2.72,2.72,2.72Z" />

            <path
                d="M39.08,42.39c-.4,0-.72-.32-.72-.72s.32-.72,.72-.72c.19,0,.37,.07,.51,.21,.39,.39,1.02,.39,1.41,0s.39-1.02,0-1.41c-.27-.27-.58-.47-.92-.6v-.28c0-.55-.45-1-1-1s-1,.45-1,1v.29c-1,.4-1.72,1.37-1.72,2.52,0,1.5,1.22,2.72,2.72,2.72,.4,0,.72,.32,.72,.72s-.32,.72-.72,.72c-.19,0-.37-.08-.51-.21-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41c.27,.27,.58,.46,.92,.6v.28c0,.55,.45,1,1,1s1-.45,1-1v-.29c1-.4,1.72-1.37,1.72-2.52,0-1.5-1.22-2.72-2.72-2.72Z" />

            <circle cx="39.08" cy="31.92" r="1" />

            <circle cx="39.08" cy="54.85" r="1" />

            <circle cx="50.55" cy="43.39" r="1" />

            <circle cx="27.62" cy="43.39" r="1" />

            <path
                d="M47.9,35.99c.39-.39,.39-1.03,0-1.41-.39-.39-1.03-.39-1.41,0-.39,.39-.39,1.03,0,1.41s1.03,.39,1.41,0Z" />

            <path
                d="M30.27,50.79c-.39,.39-.39,1.03,0,1.41,.39,.39,1.03,.39,1.41,0,.39-.39,.39-1.03,0-1.41-.39-.39-1.03-.39-1.41,0Z" />

            <path
                d="M47.19,50.49c-.27,0-.52,.11-.71,.29-.39,.39-.39,1.03,0,1.41,.19,.19,.44,.29,.71,.29s.52-.11,.71-.29c.39-.39,.39-1.03,0-1.41-.19-.19-.44-.29-.71-.29Z" />

            <path
                d="M30.98,36.28c.26,0,.52-.11,.71-.29,.39-.39,.39-1.03,0-1.41-.19-.19-.44-.29-.71-.29s-.52,.11-.71,.29c-.39,.39-.39,1.03,0,1.41,.19,.19,.44,.29,.71,.29Z" />

            <circle cx="30.02" cy="8.34" r="1" />

            <circle cx="41.48" cy="19.81" r="1" />

            <circle cx="18.55" cy="19.81" r="1" />

            <path
                d="M38.83,12.41c.39-.39,.39-1.03,0-1.41-.39-.39-1.03-.39-1.41,0-.39,.39-.39,1.03,0,1.41s1.03,.39,1.41,0Z" />

            <path
                d="M21.2,27.21c-.39,.39-.39,1.03,0,1.41,.39,.39,1.03,.39,1.41,0,.39-.39,.39-1.03,0-1.41-.39-.39-1.03-.39-1.41,0Z" />

            <path
                d="M21.91,12.7c.27,0,.52-.11,.71-.29,.39-.39,.39-1.03,0-1.41-.19-.19-.44-.29-.71-.29s-.52,.11-.71,.29c-.39,.39-.39,1.03,0,1.41,.19,.19,.44,.29,.71,.29Z" />

        </g>

        <g id="c" />

        <g id="d" />

        <g id="e" />

        <g id="f" />

        <g id="g" />

        <g id="h" />

        <g id="i" />

        <g id="j" />

        <g id="k" />

        <g id="l" />

        <g id="m" />

        <g id="n" />

        <g id="o" />

        <g id="p" />

        <g id="q" />

        <g id="r" />

        <g id="s" />

        <g id="t" />

        <g id="u" />

        <g id="v" />

        <g id="w" />

        <g id="x" />

        <g id="y" />

        <g id="a`" />

        <g id="aa" />

        <g id="ab" />

        <g id="ac" />

        <g id="ad" />

        <g id="ae" />

        <g id="af" />

        <g id="ag" />

        <g id="ah" />

        <g id="ai" />

        <g id="aj" />

        <g id="ak" />

        <g id="al" />

        <g id="am" />

        <g id="an" />

        <g id="ao" />

        <g id="ap" />

        <g id="aq" />

        <g id="ar" />

        <g id="as" />

        <g id="at" />

        <g id="au" />

        <g id="av" />

        <g id="aw" />

        <g id="ax" />

    </svg>
    const momoIcon = <svg width="64px" height="64px" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M21.1009 8.00353C21.0442 7.99996 20.9825 7.99998 20.9186 8L20.9026 8.00001H18.3941C16.3264 8.00001 14.5572 9.62757 14.5572 11.75C14.5572 13.8724 16.3264 15.5 18.3941 15.5H20.9026L20.9186 15.5C20.9825 15.5 21.0442 15.5001 21.1009 15.4965C21.9408 15.4434 22.6835 14.7862 22.746 13.8682C22.7501 13.808 22.75 13.7431 22.75 13.683L22.75 13.6667V9.83334L22.75 9.81702C22.75 9.75688 22.7501 9.69199 22.746 9.6318C22.6835 8.71381 21.9408 8.05657 21.1009 8.00353ZM18.1717 12.75C18.704 12.75 19.1355 12.3023 19.1355 11.75C19.1355 11.1977 18.704 10.75 18.1717 10.75C17.6394 10.75 17.2078 11.1977 17.2078 11.75C17.2078 12.3023 17.6394 12.75 18.1717 12.75Z"
                fill="white"></path>
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M20.9179 17C21.067 16.9961 21.1799 17.1342 21.1394 17.2778C20.9387 17.9902 20.62 18.5975 20.1088 19.1088C19.3604 19.8571 18.4114 20.1892 17.239 20.3469C16.0998 20.5 14.6442 20.5 12.8064 20.5H10.6936C8.85583 20.5 7.40019 20.5 6.26098 20.3469C5.08856 20.1892 4.13961 19.8571 3.39124 19.1088C2.64288 18.3604 2.31076 17.4114 2.15314 16.239C1.99997 15.0998 1.99998 13.6442 2 11.8064V11.6936C1.99998 9.85583 1.99997 8.40019 2.15314 7.26098C2.31076 6.08856 2.64288 5.13961 3.39124 4.39124C4.13961 3.64288 5.08856 3.31076 6.26098 3.15314C7.40019 2.99997 8.85582 2.99998 10.6936 3L12.8064 3C14.6442 2.99998 16.0998 2.99997 17.239 3.15314C18.4114 3.31076 19.3604 3.64288 20.1088 4.39124C20.62 4.90252 20.9386 5.50974 21.1394 6.22218C21.1799 6.36575 21.067 6.50387 20.9179 6.5L18.394 6.50001C15.5574 6.50001 13.0571 8.74091 13.0571 11.75C13.0571 14.7591 15.5574 17 18.394 17L20.9179 17ZM7 15.5C6.58579 15.5 6.25 15.1642 6.25 14.75V8.75C6.25 8.33579 6.58579 8 7 8C7.41421 8 7.75 8.33579 7.75 8.75V14.75C7.75 15.1642 7.41421 15.5 7 15.5Z"
                fill="white"></path>
        </g>
    </svg>
    return (
        <div className="w-screen h-screen bg-[#eef0f2] overflow-auto">
            <CashReserveModal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                onSuccess={(response) => {
                    // let dummy = data;
                    // console.log('In onSuccess, the response data is');
                    // console.log(response.data);

                    // dummy.push(response.data.data);
                    // setData(dummy);
                    console.log("Cash reserve added successfully");
                    closeModal();
                }}
            />  
          <Navigation activeLink="dashboard" />

            <div className="bg-[#f9fbfd] w-full px-6 py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                <Account name={"Cash"} balance={"8,900"} currency={"FCFA"} icon={cashIcon} backgroundColor={"#00897b"} />
                <Account name={"Momo"} balance={"10,000"} currency={"FCFA"} icon={momoIcon} backgroundColor={"#aa47bc"} />
                <Account name={"Bank"} balance={"20,000"} currency={"FCFA"} icon={cashIcon} backgroundColor={"#1356bf"} />
                <div className="p-2 gap-2 bg-transparent border-2 border-dashed flex flex-col justify-center rounded-md items-center hover:cursor-pointer"
                onClick={() => openModal()}>
                    <span>+Add Account</span>
                </div>
            </div>

            <div className="w-full flex justify-center items-center mt-4 gap-3">
                <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Choose a country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                </select>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 px-6 gap-3">
                <ExpenseStructureCard />
                <CashFlowCard />
                <BalanceTrendCard />
            </div>
        </div>
    )
}


export default Dashboard