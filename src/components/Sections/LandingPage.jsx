import {motion} from 'framer-motion';
import './LandingPage.css'

export default function LandingPage({onGetStarted}) {
    return (
        <div className="landing-page">
            <motion.div 
                className="landing-content"
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{ duration: 1 }}
                >
                <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="landing-title"
                >
                    Welcome
                </motion.h1>
                <motion.p
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="landing-subtitle"
                >
                    Explore my portfolio
                </motion.p>
                <motion.button
                  className="get-started-btn"
                  onClick={onGetStarted}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                   delay: 1.2, 
                    type: "spring", 
                    stiffness: 200 
              }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 0 30px rgba(79, 70, 229, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
          <motion.div
            className="pulse-ring"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [1, 0, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.button>
            </motion.div>
        </div>
    )
}