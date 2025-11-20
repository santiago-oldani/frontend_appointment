import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";
import {type Dispatch, type SetStateAction } from 'react';
import { motion, AnimatePresence } from "motion/react"

interface Coverages {
    title: string;
    plans: string[];
}

type DropDownAction = Dispatch<SetStateAction<number[]>>;

const CoverageItem = ({ cov, itemId, dropDowns, setDropDowns }:
    {
        cov: Coverages;
        itemId: number;
        dropDowns: number[];
        setDropDowns: DropDownAction
    }) => {

    const isOpen = dropDowns.includes(itemId);

    return (

        <div className="flex flex-col items-start justify-start">
            <div
                onClick={() => setDropDowns(dropDowns.includes(itemId) ? dropDowns.filter(keyArray => keyArray !== itemId) : [...dropDowns, itemId])}
                className="flex justify-center w-fit items-center cursor-pointer gap-[3px]"
            >
                {dropDowns.includes(itemId) ? <IoMdArrowDropdown size={30} color="#0047BA" className="flex-shrink-0"/> : <IoMdArrowDropright size={30} color="#0047BA" className="flex-shrink-0"/>}
                <h4 className=" text-[#0047BA]">{cov.title}</h4>
            </div>
            <AnimatePresence>
                {isOpen && <motion.div
                    key={itemId}
                    initial={{ height: 0 }}
                    whileInView={{ height: "auto" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    exit={{ height: 0 }}
                    className={`mt-2 pl-4 overflow-hidden`}>
                    <ul className="flex flex-col items-start justify-start">
                        {cov.plans.map((plan) => {
                            return (
                                <li>{plan}</li>
                            )
                        })}
                    </ul>
                </motion.div>}

            </AnimatePresence>
        </div>
    );
};

export default CoverageItem;