import { motion } from "framer-motion";
const animationConfiguration = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};
const Transition = ({ children }) => {
    return (
        <motion.div
        
            variants={animationConfiguration}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: .20, ease: 'easeInOut' }}
        >
            {children}
        </motion.div>
    );
};
export default Transition;