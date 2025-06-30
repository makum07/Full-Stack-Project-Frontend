import '../styles/global.scss';
import ReduxProvider from './redux/ReduxProvider';

export const metadata = {
  title: 'SkillUp Task Manager',
  description: 'Manage tasks by category',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="container py-4">
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
