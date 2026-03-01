"use client";
import { motion, Variants } from "framer-motion";
import Header from "../header";
import Footer from "../footer";
import "./references.css";

export default function ReferencesPage() {
  const images = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1541167760496-1628856ab772",
      title: "Coffee with Council",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1652971876875-05db98fab376",
      title: "Volunteer @ Sammamish Landing",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1514583079045-e928a4732ade",
      title: "Sammamish Farmers Market",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1563737484889-d240317436f6",
      title: "Community Event",
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1",
      title: "Community Building",
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1551958219-acbc608c6377",
      title: "Volunteer Activity",
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1764173040171-57f79264b358",
      title: "Fitness Community",
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1610986603166-f78428624e76",
      title: "Coding Workshop",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="references-page">
    <div className="references-gradient">
      <Header />

      <main className="references-container">
        <motion.section
          className="references-hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="references-title">References</h1>
          <h3 className="references-images-used">Images Used</h3>
          <p className="references-subtitle">
            All images used are 100% copyright-free
          </p>
        </motion.section>

        <motion.div
          className="images-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {images.map((image) => (
            <motion.a
              key={image.id}
              href={image.url}
              target="_blank"
              rel="noopener noreferrer"
              className="image-card"
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              <div className="image-wrapper">
                <img src={`${image.url}?w=400`} alt={image.title} />
                <div className="image-overlay">
                  <span className="image-link-text">View on Unsplash →</span>
                </div>
              </div>
              <p className="image-title">{image.url}</p>
            </motion.a>
          ))}
        </motion.div>

        <motion.section
          className="credits-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="credits-title">Credits</h2>
          <p className="credits-text">
            All images are sourced from{" "}
            <a
              href="https://unsplash.com"
              target="_blank"
              rel="noopener noreferrer"
              className="credits-link"
            >
              Unsplash
            </a>
            , a platform offering free, high-quality stock photography. Images
            are used under the Unsplash License, allowing free use for commercial
            and non-commercial purposes.
          </p>
        </motion.section>
      </main>

      <Footer />
    </div>
    </div>
  );
}
