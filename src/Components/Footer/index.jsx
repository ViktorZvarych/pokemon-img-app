import styles from './footer.module.css'

export default function Footer() {
    let thisYear = (new Date()).getFullYear();
    console.log(thisYear);

    return (
        <div className={styles.footer}>
            <p>© {thisYear} Viktor Zvarych</p>
        </div>
    )
}
