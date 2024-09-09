import React from 'react';
// Import the icons from react-icons
import { FaHome, FaShoppingBasket, FaBus, FaGasPump, FaCar, FaHeartbeat, FaFileMedical, FaTshirt, FaFilm, FaWifi, FaMobileAlt, FaTv, FaGraduationCap, FaCreditCard, FaPiggyBank, FaGift, FaPaw, FaDumbbell, FaTools, FaPlane, FaBook, FaPen, FaBalanceScale, FaCalculator, FaBriefcase, FaCut, FaPuzzlePiece, FaLaptop, FaCouch, FaPaintBrush, FaSeedling, FaBasketballBall, FaTicketAlt, FaParking, FaRoad, FaEnvelope, FaMoneyBillWave, FaUniversity, FaRing, FaChild, FaCross, FaBabyCarriage, FaIdCard, FaLock, FaBug, FaWarehouse, FaFire, FaTint, FaTrashAlt, FaSnowflake, FaWrench, FaHeart, FaWheelchair, FaUserSecret, FaGavel, FaEye, FaTooth, FaCapsules, FaBrain, FaSpa, FaHandHoldingMedical, FaLeaf, FaPrayingHands, FaVoteYea, FaChartPie, FaSchool, FaPencilAlt, FaWallet, FaBullhorn, FaCode, FaCloud, FaDatabase, FaVideo, FaLaptopCode } from 'react-icons/fa';
import { MdElectricalServices, MdRestaurantMenu, MdSubscriptions } from 'react-icons/md';
import { FaPlus, FaMinus } from 'react-icons/fa';


const IconRenderer = ({ size = 50, backgroundColor = '#f0f0f0', name = 'Rent/Mortgage' }) => {
    let IconComponent;

    // Match the category name with an icon
    switch (name.toLowerCase()) {
        case 'rent/mortgage':
            IconComponent = FaHome;
            break;
        case 'groceries':
            IconComponent = FaShoppingBasket;
            break;
        case 'public transportation':
            IconComponent = FaBus;
            break;
        case 'fuel/gas':
            IconComponent = FaGasPump;
            break;
        case 'car maintenance':
            IconComponent = FaCar;
            break;
        case 'health insurance':
            IconComponent = FaHeartbeat;
            break;
        case 'medical bills':
            IconComponent = FaFileMedical;
            break;
        case 'clothing':
            IconComponent = FaTshirt;
            break;
        case 'entertainment':
            IconComponent = FaFilm;
            break;
        case 'internet service':
            IconComponent = FaWifi;
            break;
        case 'mobile phone':
            IconComponent = FaMobileAlt;
            break;
        case 'tv/cable':
            IconComponent = FaTv;
            break;
        case 'education/tuition':
            IconComponent = FaGraduationCap;
            break;
        case 'credit card payments':
            IconComponent = FaCreditCard;
            break;
        case 'savings':
            IconComponent = FaPiggyBank;
            break;
        case 'gifts':
            IconComponent = FaGift;
            break;
        case 'pet care':
            IconComponent = FaPaw;
            break;
        case 'gym membership':
            IconComponent = FaDumbbell;
            break;
        case 'home maintenance':
            IconComponent = FaTools;
            break;
        case 'vacation/travel':
            IconComponent = FaPlane;
            break;
        case 'books':
            IconComponent = FaBook;
            break;
        case 'office supplies':
            IconComponent = FaPen;
            break;
        case 'legal fees':
            IconComponent = FaBalanceScale;
            break;
        case 'accounting fees':
            IconComponent = FaCalculator;
            break;
        case 'professional development':
            IconComponent = FaBriefcase;
            break;
        case 'haircuts/salon':
            IconComponent = FaCut;
            break;
        case 'hobbies':
            IconComponent = FaPuzzlePiece;
            break;
        case 'electronics':
            IconComponent = FaLaptop;
            break;
        case 'furniture':
            IconComponent = FaCouch;
            break;
        case 'home decor':
            IconComponent = FaPaintBrush;
            break;
        case 'gardening':
            IconComponent = FaSeedling;
            break;
        case 'sports activities':
            IconComponent = FaBasketballBall;
            break;
        case 'concerts/events':
            IconComponent = FaTicketAlt;
            break;
        case 'parking fees':
            IconComponent = FaParking;
            break;
        case 'tolls':
            IconComponent = FaRoad;
            break;
        case 'postage/shipping':
            IconComponent = FaEnvelope;
            break;
        case 'atm fees':
            IconComponent = FaMoneyBillWave;
            break;
        case 'charity/donations':
            IconComponent = FaPrayingHands;
            break;
        case 'political contributions':
            IconComponent = FaVoteYea;
            break;
        case 'retirement contributions':
            IconComponent = FaWallet;
            break;
        case 'cloud storage':
            IconComponent = FaCloud;
            break;
        case 'online courses':
            IconComponent = FaLaptopCode;
            break;
        case 'plus':
            IconComponent= FaPlus;
            break;
        case 'minus':
            IconComponent = FaMinus;
            break;
        // Add more categories and icons as needed
        default:
            IconComponent = FaHome; // Default icon if no match
    }

    return (
        <IconComponent size={size} color={backgroundColor} />
    );
};

export default IconRenderer;
