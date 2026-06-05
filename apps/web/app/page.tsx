import { Card } from '@repo/ui/card';
import styles from './page.module.css';

export default function Page(): JSX.Element {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Web</h1>

      <Card className={styles.card} title="Hello, World!">
        This is a card from the UI package.
      </Card>
    </main>
  );
}
