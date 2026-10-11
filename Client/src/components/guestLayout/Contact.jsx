import React from 'react';

const Contact = () => {

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
        contactItem: {
            marginBottom: '10px',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Contact Us</h1>
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>General Inquiries</h2>
                <p style={styles.paragraph}>
                    For any general questions or support, please reach out to us using the contact details below:
                </p>
                <ul style={styles.list}>
                    <li style={styles.contactItem}>
                        <strong>Email:</strong> support@example.com
                    </li>
                    <li style={styles.contactItem}>
                        <strong>Phone:</strong> +1 (555) 123-4567
                    </li>
                    <li style={styles.contactItem}>
                        <strong>Address:</strong> 1234 Main St, Suite 100, Anytown, USA
                    </li>
                </ul>
            </div>
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Media Inquiries</h2>
                <p style={styles.paragraph}>
                    For press and media-related inquiries, please contact our media relations team:
                </p>
                <ul style={styles.list}>
                    <li style={styles.contactItem}>
                        <strong>Email:</strong> media@example.com
                    </li>
                    <li style={styles.contactItem}>
                        <strong>Phone:</strong> +1 (555) 987-6543
                    </li>
                </ul>
            </div>
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Business Partnerships</h2>
                <p style={styles.paragraph}>
                    If you are interested in business partnerships or have related questions, please reach out to:
                </p>
                <ul style={styles.list}>
                    <li style={styles.contactItem}>
                        <strong>Email:</strong> partnerships@example.com
                    </li>
                    <li style={styles.contactItem}>
                        <strong>Phone:</strong> +1 (555) 765-4321
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Contact;
