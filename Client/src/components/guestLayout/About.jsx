import React from 'react';

// Inline styles for basic styling
const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
  },
  header: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#2c3e50',
  },
  section: {
    marginBottom: '20px',
    textAlign: 'left',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    color: '#2980b9',
  },
  paragraph: {
    lineHeight: '1.6',
    color: '#34495e',
  },
  list: {
    listStyleType: 'disc',
    marginLeft: '20px',
  },
};

const About = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>About Our Technology Stack</h1>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>What is Our Code Stack?</h2>
        <p style={styles.paragraph}>
          Our technology stack, or "code stack," refers to the combination of technologies used to build and run our web applications.
          It includes various layers such as the frontend, backend, and database systems. By leveraging modern technologies,
          we ensure our applications are efficient, scalable, and secure.
        </p>
      </div>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Key Components</h2>
        <ul style={styles.list}>
          <li style={styles.paragraph}><strong>Frontend:</strong> React.js for building dynamic user interfaces.</li>
          <li style={styles.paragraph}><strong>Backend:</strong> Node.js and Express for server-side logic and APIs.</li>
          <li style={styles.paragraph}><strong>Database:</strong> MongoDB for a flexible, NoSQL database solution.</li>
          <li style={styles.paragraph}><strong>Hosting:</strong> AWS for scalable cloud hosting and infrastructure services.</li>
        </ul>
      </div>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Benefits of Our Technology Stack</h2>
        <p style={styles.paragraph}>
          Our choice of technology stack provides several advantages, including:
        </p>
        <ul style={styles.list}>
          <li style={styles.paragraph}>High performance and fast load times due to efficient frontend and backend technologies.</li>
          <li style={styles.paragraph}>Scalability to handle increased traffic and user load with cloud-based hosting.</li>
          <li style={styles.paragraph}>Flexibility and rapid development thanks to modern frameworks and tools.</li>
          <li style={styles.paragraph}>Enhanced security and reliability with industry-standard technologies and practices.</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
