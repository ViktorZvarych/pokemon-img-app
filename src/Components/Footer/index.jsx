import { useState } from 'react'
import styles from './footer.module.css'

export default function Footer() {
    const [currentYear, setCurrentYear] = useState((new Date()).getFullYear());

    return (
        <div className={styles.footer}>
            <p>© {currentYear} Viktor Zvarych</p>
        </div>
    )
}
