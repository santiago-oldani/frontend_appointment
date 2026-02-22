import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            const scrolled = window.scrollY || document.documentElement.scrollTop;
            if (scrolled > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="fixed bottom-[70px] p-[20px] max-[400px]:bg-[#12caff] max-[400px]:right-[20px] 12caff max-[400px]:p-[15px] right-[50px] z-[2000] bg-[#0047ba] p-4 rounded-full shadow-2xl cursor-pointer border-none flex items-center justify-center hover:bg-[#12caff] transition-colors duration-300"
                >
                    <FaArrowUp size={30} color='#fff' className='max-[400px]:w-[22px] max-[400px]:h-[22px]'/>
                </motion.button>
            )}
        </AnimatePresence>
    )
}

export default ScrollToTop;