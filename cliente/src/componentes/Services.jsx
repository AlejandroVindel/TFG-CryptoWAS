import { BsShieldFillCheck } from 'react-icons/bs';
import { BiSearchAlt } from 'react-icons/bi';
import { RiHeart2Fill } from 'react-icons/ri'; 

//Carta de servicios, para reutilizarlo
const ServicesCard = ( {color, tittle, icon, subtitle} ) => (
    <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
        <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
            {icon}
        </div>
        <div className="ml-5 flex flex-col flex-1">
            <h1 className="mt-2 text-white text-lg">{tittle}</h1>
            <p className="mt-2 text-white text-sm md:w-9/12">{subtitle}</p>
        </div>
    </div>
)

const Services = () =>{
    return (
        <div className="flex flex-col md:flex-row w-full justify-center items-center gradient-bg-services">
            <div className="flex mf:flex-row items-center justify-between md:p-20 p-y-12 px-4">
                <div className="flex-1 flex flex-col justify-start items-start">
                    <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient">
                        Servicios
                        <br/>
                        que nostros mejoramos
                    </h1>
                </div>
            </div>
            <div className="flex-1 flex flex-col justify-start items-center">
                {/* Añadimos las cartas creadas al inicio del codigo */}
                <ServicesCard color="bg-[#2952E3]" tittle="Garantía de Seguridad"
                 icon={<BsShieldFillCheck fontSize={21} className="text-white"/>}
                 subtitle="Nuestra seguridad es la garantía. Mantemos la privacidad y la calidad de nuestros productos"/>
                  <ServicesCard color="bg-[#89445F8]" tittle="Cambio de divisas fáciles"
                 icon={<BiSearchAlt fontSize={21} className="text-white"/>}
                 subtitle="Nuestra seguridad es la garantía. Mantemos la privacidad y la calidad de nuestros productos"/>
                  <ServicesCard color="bg-[#F84550]" tittle="Transacciones rápidas"
                 icon={<RiHeart2Fill fontSize={21} className="text-white"/>}
                 subtitle="Nuestra seguridad es la garantía. Mantemos la privacidad y la calidad de nuestros productos"/>
            </div>
        </div>
    );
}

export default Services;