import { memo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const About = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 bg-beige-light" aria-labelledby="about-title">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={itemVariants}>
            <h2 id="about-title" className="text-5xl md:text-6xl font-serif mb-6 text-espresso-dark">
              Философия кофе
            </h2>
            <div className="w-24 h-1 bg-gold mb-8" aria-hidden="true" />
            <p className="text-lg text-espresso-medium mb-6 leading-relaxed">
              Мы верим, что каждая чашка кофе — это история. История о далёких плантациях,
              мастерстве обжарщиков и искусстве бариста.
            </p>
            <p className="text-lg text-espresso-medium mb-6 leading-relaxed">
              Наши зёрна проходят путь от высокогорных ферм Эфиопии, Колумбии и Бразилии
              до вашей чашки, сохраняя уникальный профиль вкуса.
            </p>
            <p className="text-lg text-espresso-medium leading-relaxed">
              Мы обжариваем небольшими партиями, чтобы раскрыть всю глубину аромата
              и обеспечить максимальную свежесть.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-espresso-medium to-espresso-light opacity-90" />
              <img
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800"
                alt="Россыпь свежеобжаренных кофейных зёрен арабики"
                className="w-full h-full object-cover mix-blend-overlay"
                loading="lazy"
                decoding="async"
                width={800}
                height={500}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-beige-light text-center p-8">
                  <div className="text-6xl font-serif mb-4">100%</div>
                  <div className="text-xl">Arabica Premium</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

About.displayName = 'About';

export default About;